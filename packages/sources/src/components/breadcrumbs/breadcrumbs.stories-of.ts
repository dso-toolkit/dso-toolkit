import { StoriesOfArguments, storiesOfFactory } from '../../storybook/stories-of-factory';

import { BreadcrumbsArgs, breadcrumbsArgsMapper, breadcrumbsArgTypes } from './breadcrumbs.args';
import { Breadcrumbs } from './breadcrumbs.models';

export interface BreadcrumbsTemplates<TemplateFnReturnType> {
  breadcrumbsTemplate: (breadcrumbsProperties: Breadcrumbs) => TemplateFnReturnType;
}

export function storiesOfBreadcrumbs<Implementation, Templates, TemplateFnReturnType>(storiesOfArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, BreadcrumbsTemplates<TemplateFnReturnType>>) {
  return storiesOfFactory('Breadcrumbs',storiesOfArguments, (stories, templateMapper) => {
    stories
      .addParameters({
        argTypes: breadcrumbsArgTypes
      });

    const template = templateMapper<BreadcrumbsArgs>((args, { breadcrumbsTemplate }) => breadcrumbsTemplate(breadcrumbsArgsMapper(args)));

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
}
