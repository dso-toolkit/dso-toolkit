import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { paginationArgsMapper, paginationArgTypes } from './pagination.args';
import { Pagination } from './pagination.models';

export interface PaginationParameters<TemplateFnReturnType> {
  paginationTemplate: (paginationProperties: Pagination) => TemplateFnReturnType;
}

export function storiesOfPagination<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    paginationTemplate
  }: PaginationParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(paginationArgsMapper, paginationTemplate);

  const stories = storiesOf('Pagination', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: paginationArgTypes,
    });

  stories.add(
    'Pagination',
    template,
    {
      args: {
        count: 5,
        current: 3,
        label: 'Pagina navigatie',
      }
    }
  );
}
