import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { breadcrumbsArgsMapper, breadcrumbsArgTypes } from './breadcrumbs.args';
import { Breadcrumbs } from './breadcrumbs.models';

export interface BreadcrumbsParameters<TemplateFnReturnType> {
  breadcrumbsTemplate: (breadcrumbsProperties: Breadcrumbs) => TemplateFnReturnType;
}

export function storiesOfBreadcrumbs<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    breadcrumbsTemplate
  }: BreadcrumbsParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(breadcrumbsArgsMapper, breadcrumbsTemplate);

  const stories = storiesOf('Breadcrumb', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: breadcrumbsArgTypes
    });

  stories.add(
    'breadcrumb',
    template,
    {
      args: {
        breadcrumbs: [
          {
            label: 'Home',
            url: '#'
          },
          {
            label: 'Zelf aan de slag',
            url: '#'
          },
          {
            label: 'Inhoud'
          }
        ]
      }
    }
  );
}
