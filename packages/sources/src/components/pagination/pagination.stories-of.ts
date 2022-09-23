import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { paginationArgsMapper, paginationArgTypes } from './pagination.args';
import { Pagination } from './pagination.models';

export interface PaginationParameters<TemplateFnReturnType> {
  paginationTemplate: (paginationProperties: Pagination) => TemplateFnReturnType;
}

export function storiesOfPagination<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    paginationTemplate
  }: PaginationParameters<TemplateFnReturnType>
) {
  const stories = createStories('Pagination', parameters, paginationArgTypes);
  const template = bindTemplate(paginationArgsMapper, paginationTemplate);

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
}
