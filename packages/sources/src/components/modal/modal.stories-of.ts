import { storiesOfFactory } from '../../storybook/stories-of-factory';
import { ProgressIndicator } from '../progress-indicator/progress-indicator.models';

import { ModalArgs, modalArgsMapper, modalArgTypes, ModalLoadingArgs, modalLoadingArgTypes } from './modal.args';
import { content } from './modal.content';
import { Modal } from './modal.models';

// <see #1550>
let onLeave: { load: Function, unload: Function } | null = null;
function onStory(load: Function, unload: Function) {
  onLeave = { load, unload };

  load();
}

const storyObserver = new MutationObserver(() => {
  if (onLeave) {
    onLeave.unload();

    onLeave = null;
  }
});
storyObserver.observe(window.parent.document.head.querySelector('title')!, { childList: true, subtree: true });

const canvasObserver = new MutationObserver(mutationRecords => {
  for (const mutationRecord of mutationRecords.filter(r => r.type === 'attributes')) {
    if (!(mutationRecord.target instanceof HTMLElement)) {
      continue;
    }

    if (mutationRecord.target.hidden) {
      onLeave?.unload();
    }
  }
});
canvasObserver.observe(document.getElementById('root')!, { attributes: true });

function toggleClass(className: string) {
  setTimeout(
    () => onStory(
      () => document.body.classList.add(className),
      () => document.body.classList.remove(className)
    ),
    400
  );
}
// </see #1550>

export interface ModalTemplates<TemplateFnReturnType> {
  modalTemplate: (modalProperties: Modal<TemplateFnReturnType>) => TemplateFnReturnType;
  progressIndicatorTemplate: (progressIndicatorProperties: ProgressIndicator) => TemplateFnReturnType;
}

export const storiesOfModal = storiesOfFactory<ModalTemplates<any>, ModalArgs>('Modal', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: modalArgTypes
  });

  const template = templateMapper((args, { modalTemplate }) => {
    toggleClass('dso-modal-open');

    return modalTemplate(modalArgsMapper(args));
  });

  stories.add(
    'confirm',
    templateMapper((args, { modalTemplate }) => {
      toggleClass('dso-modal-open');

      return modalTemplate(modalArgsMapper(args));
    }),
    {
      argTypes: modalArgTypes,
      args: content.confirm
    }
  );

  stories.add(
    'passive',
    template,
    {
      argTypes: modalArgTypes,
      args: content.passive
    }
  );

  stories.add(
    'active',
    template,
    {
      argTypes: modalArgTypes,
      args: content.active
    }
  );

  stories.add(
    'loading',
    templateMapper<ModalLoadingArgs>((args, { modalTemplate, progressIndicatorTemplate }) => {
      toggleClass('dso-modal-open');

      const modal: Modal<any> = {
        role: args.role,
        body: progressIndicatorTemplate({
          size: 'small',
          block: true,
          label: args.progressIndicatorLabel
        })
      };

      return modalTemplate(modal);
    }),
    {
      argTypes: modalLoadingArgTypes,
      args: content.loading
    }
  );
})
