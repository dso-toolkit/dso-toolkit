import { StoriesOfArguments, storiesOfFactory } from '../../storybook/stories-of-factory';

import { PaginationArgs, paginationArgsMapper, paginationArgTypes } from './pagination.args';
import { Pagination } from './pagination.models';

export interface PaginationTemplates<TemplateFnReturnType> {
  paginationTemplate: (paginationProperties: Pagination) => TemplateFnReturnType;
}

export function storiesOfPagination<Implementation, Templates, TemplateFnReturnType>(storiesOfArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, PaginationTemplates<TemplateFnReturnType>>) {
  return storiesOfFactory('Pagination', storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: paginationArgTypes
    });

    const template = templateMapper<PaginationArgs>((args, { paginationTemplate }) => paginationTemplate(paginationArgsMapper(args)));

    stories.add(
      'Pagination',
      template,
      {
        args: {
          totalPages: 16,
          currentPage: 8,
        }
      }
    );
  });
}
