import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { cardGridArgsMapper } from './card-grid.args';
import { CardGrid } from './card-grid.models';

export interface CardGridParameters<TemplateFnReturnType> {
  cardGridTemplate: (cardProperties: CardGrid<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfCardGrid<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    cardGridTemplate
  }: CardGridParameters<TemplateFnReturnType>
) {
  const stories = createStories('Card Grid', parameters, {});
  const template = bindTemplate(cardGridArgsMapper, cardGridTemplate);

  stories.add(
    'Card Grid',
    template
  );
}
