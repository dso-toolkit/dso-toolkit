import { bindTemplate, componentArgs, StorybookParameters } from '../../stories-helpers';

import { PaginationArgs, paginationArgsMapper, paginationArgTypes } from './pagination.args';
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
      args: componentArgs<PaginationArgs>({
        count: 5,
        current: 3
      })
    });

  stories.add(
    'Pagination',
    template
  );
}
