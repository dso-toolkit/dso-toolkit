import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { PaginationArgs, paginationArgsMapper, paginationArgTypes } from './pagination.args';
import { Pagination } from './pagination.models';

export interface PaginationTemplates<TemplateFnReturnType> {
  paginationTemplate: (paginationProperties: Pagination) => TemplateFnReturnType;
}

export const storiesOfPagination = storiesOfFactory<PaginationTemplates<any>, PaginationArgs>('Pagination', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: paginationArgTypes
  });

  const template = templateMapper((args, { paginationTemplate }) => paginationTemplate(paginationArgsMapper(args)));

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
})

// export function storiesOfPagination<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     paginationTemplate
//   }: PaginationParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Pagination', parameters, paginationArgTypes);
//   const template = bindTemplate(paginationArgsMapper, paginationTemplate);


// }
