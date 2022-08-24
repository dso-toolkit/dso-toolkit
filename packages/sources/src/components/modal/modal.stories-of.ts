import { Args } from '@storybook/addons';
import { createStories, StorybookParameters } from '../../storybook';
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

export interface ModalParameters<TemplateFnReturnType> {
  modalTemplate: (modalProperties: Modal<TemplateFnReturnType>) => TemplateFnReturnType;
  progressIndicatorTemplate: (progressIndicatorProperties: ProgressIndicator) => TemplateFnReturnType;
}

export function storiesOfModal<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    modalTemplate,
    progressIndicatorTemplate
  }: ModalParameters<TemplateFnReturnType>
) {
  const stories = createStories('Modal', parameters, {});

  stories.add(
    'confirm',
    (a: Args) => {
      const modal = modalArgsMapper(a as ModalArgs);

      toggleClass('dso-modal-open');

      return modalTemplate(modal);
    },
    {
      argTypes: modalArgTypes,
      args: content.confirm
    }
  );

  stories.add(
    'passive',
    (a: Args) => {
      const modal = modalArgsMapper(a as ModalArgs);

      toggleClass('dso-modal-open');

      return modalTemplate(modal);
    },
    {
      argTypes: modalArgTypes,
      args: content.passive
    }
  );

  stories.add(
    'active',
    (a: Args) => {
      const modal = modalArgsMapper(a as ModalArgs);

      toggleClass('dso-modal-open');

      return modalTemplate(modal);
    },
    {
      argTypes: modalArgTypes,
      args: content.active
    }
  );

  stories.add(
    'loading',
    (a: Args) => {
      const args = a as ModalLoadingArgs;

      toggleClass('dso-modal-open');

      const modal: Modal<TemplateFnReturnType> = {
        role: args.role,
        body: progressIndicatorTemplate({
          size: 'small',
          block: true,
          label: args.progressIndicatorLabel
        })
      };

      return modalTemplate(modal);
    },
    {
      argTypes: modalLoadingArgTypes,
      args: content.loading
    }
  );
}
