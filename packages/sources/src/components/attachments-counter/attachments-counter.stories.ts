import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { attachmentsCounterArgsMapper, attachmentsCounterArgTypes } from './attachments-counter.args';
import { AttachmentsCounter } from './attachments-counter.models';

export interface AttachmentsCounterParameters<TemplateFnReturnType> {
  attachmentsCounterTemplate: (attachmentsCounterProperties: AttachmentsCounter) => TemplateFnReturnType;
}

export function storiesOfAttachmentsCounter<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    attachmentsCounterTemplate
  }: AttachmentsCounterParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Attachments Counter', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: attachmentsCounterArgTypes
    });

  stories.add(
    'Attachments Counter',
    bindTemplate(attachmentsCounterArgsMapper, attachmentsCounterTemplate),
    {
      args: {
        count: 3
      }
    }
  );
}
