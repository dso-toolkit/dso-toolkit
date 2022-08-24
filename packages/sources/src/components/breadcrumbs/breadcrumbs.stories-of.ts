import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { breadcrumbsArgsMapper, breadcrumbsArgTypes } from './breadcrumbs.args';
import { Breadcrumbs } from './breadcrumbs.models';

export interface BreadcrumbsParameters<TemplateFnReturnType> {
  breadcrumbsTemplate: (breadcrumbsProperties: Breadcrumbs) => TemplateFnReturnType;
}

export function storiesOfBreadcrumbs<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    breadcrumbsTemplate
  }: BreadcrumbsParameters<TemplateFnReturnType>
) {
  const stories = createStories('Breadcrumb', parameters, breadcrumbsArgTypes);
  const template = bindTemplate(breadcrumbsArgsMapper, breadcrumbsTemplate);

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
