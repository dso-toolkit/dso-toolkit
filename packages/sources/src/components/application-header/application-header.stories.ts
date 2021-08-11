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
    'default',
    template,
    {
      args: {
        title: 'H1 Paginatitel'
      }
    }
  );

  stories.add(
    'with subtitle',
    template,
    {
      args: {
        title: 'H1 Paginatitel',
        subtitle: 'H2 Subtitel'
      }
    }
  );

  stories.add(
    'with subtitle and steps',
    template,
    {
      args: {
        title: 'H1 Paginatitel',
        subtitle: 'H2 Subtitel',
        step: 'Stap x van x'
      }
    }
  );

  stories.add(
    'subtitle only',
    template,
    {
      args: {
        subtitle: 'H2 Subtitel'
      }
    }
  );

  stories.add(
    'subtitle and steps only',
    template,
    {
      args: {
        subtitle: 'H2 Subtitel',
        step: 'Stap x van x'
      }
    }
  );
}
