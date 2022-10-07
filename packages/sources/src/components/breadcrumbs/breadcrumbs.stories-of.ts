import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { BreadcrumbsArgs, breadcrumbsArgsMapper, breadcrumbsArgTypes } from './breadcrumbs.args';
import { Breadcrumbs } from './breadcrumbs.models';

export interface BreadcrumbsTemplates<TemplateFnReturnType> {
  breadcrumbsTemplate: (breadcrumbsProperties: Breadcrumbs) => TemplateFnReturnType;
}

export const storiesOfBreadcrumbs = storiesOfFactory<BreadcrumbsTemplates<any>, BreadcrumbsArgs>('Breadcrumb', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: breadcrumbsArgTypes
    });

  const template = templateMapper((args, { breadcrumbsTemplate }) => breadcrumbsTemplate(breadcrumbsArgsMapper(args)));

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
});

// export function storiesOfBreadcrumbs<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     breadcrumbsTemplate
//   }: BreadcrumbsParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Breadcrumb', parameters, breadcrumbsArgTypes);
//   const template = bindTemplate(breadcrumbsArgsMapper, breadcrumbsTemplate);

// }
