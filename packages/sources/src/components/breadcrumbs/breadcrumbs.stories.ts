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
  const stories = storiesOf('Breadcrumb', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: breadcrumbsArgTypes
    });

  stories.add(
    'breadcrumb',
    bindTemplate(breadcrumbsArgsMapper, breadcrumbsTemplate),
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
