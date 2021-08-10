import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { applicationHeaderArgsMapper, applicationHeaderArgTypes } from './application-header.args';
import { ApplicationHeader } from './application-header.models';

export interface ApplicationHeaderParameters<TemplateFnReturnType> {
  applicationHeaderTemplate: (applicationHeaderProperties: ApplicationHeader) => TemplateFnReturnType;
}

export function storiesOfApplicationHeader<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    applicationHeaderTemplate
  }: ApplicationHeaderParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(applicationHeaderArgsMapper, applicationHeaderTemplate);

  const stories = storiesOf('Application Header', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: applicationHeaderArgTypes
    });

  stories.add(
    'Application Header',
    template,
    {
      args: {
        count: 3
      }
    }
  );
}
