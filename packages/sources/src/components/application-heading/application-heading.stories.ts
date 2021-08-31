import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { applicationHeadingArgsMapper, applicationHeadingArgTypes } from './application-heading.args';
import { ApplicationHeading } from './application-heading.models';

export interface ApplicationHeadingParameters<TemplateFnReturnType> {
  applicationHeadingTemplate: (applicationHeadingProperties: ApplicationHeading) => TemplateFnReturnType;
}

export function storiesOfApplicationHeading<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    applicationHeadingTemplate
  }: ApplicationHeadingParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(applicationHeadingArgsMapper, applicationHeadingTemplate);

  const stories = storiesOf('Application Heading', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: applicationHeadingArgTypes
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
