import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { attachmentsCounterArgsMapper, attachmentsCounterArgTypes } from './attachments-counter.args';
import { AttachmentsCounter } from './attachments-counter.models';

export interface AttachmentsCounterParameters<TemplateFnReturnType> {
  attachmentsCounterTemplate: (attachmentsCounterProperties: AttachmentsCounter) => TemplateFnReturnType;
}

export function storiesOfAttachmentsCounter<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    attachmentsCounterTemplate
  }: AttachmentsCounterParameters<TemplateFnReturnType>
) {
  const stories = createStories('Attachments Counter', parameters, attachmentsCounterArgTypes);
  const template = bindTemplate(attachmentsCounterArgsMapper, attachmentsCounterTemplate);

  stories.add(
    'Attachments Counter',
    template,
    {
      args: {
        count: 3
      }
    }
  );
}
