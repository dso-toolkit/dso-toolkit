import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { cardGridArgsMapper } from './card-grid.args';
import { CardGrid } from './card-grid.models';

export interface CardGridParameters<TemplateFnReturnType> {
  cardGridTemplate: (cardProperties: CardGrid<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfCardGrid<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    cardGridTemplate
  }: CardGridParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(cardGridArgsMapper, cardGridTemplate);

  const stories = storiesOf('Card Grid', mainModule)
    .addParameters({
      docs: {
        page: readme
      }
    });

  stories.add(
    'Card Grid',
    template
  );
}
