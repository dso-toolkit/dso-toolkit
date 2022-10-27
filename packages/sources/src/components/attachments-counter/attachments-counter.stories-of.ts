import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { AttachmentsCounterArgs, attachmentsCounterArgsMapper, attachmentsCounterArgTypes } from './attachments-counter.args';
import { AttachmentsCounter } from './attachments-counter.models';

export interface AttachmentsCounterTemplates<TemplateFnReturnType> {
  attachmentsCounterTemplate: (attachmentsCounterProperties: AttachmentsCounter) => TemplateFnReturnType;
}

export const storiesOfAttachmentsCounter = storiesOfFactory<AttachmentsCounterTemplates<any>, AttachmentsCounterArgs>('Attachments Counter', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: attachmentsCounterArgTypes
    });

  const template = templateMapper((args, { attachmentsCounterTemplate }) => attachmentsCounterTemplate(attachmentsCounterArgsMapper(args)));

  stories.add(
    'Attachments Counter',
    template,
    {
      args: {
        count: 3
      }
    }
  );
});
