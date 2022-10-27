import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { cardGridArgsMapper } from './card-grid.args';
import { CardGrid } from './card-grid.models';

export interface CardGridTemplates<TemplateFnReturnType> {
  cardGridTemplate: (cardProperties: CardGrid<TemplateFnReturnType>) => TemplateFnReturnType;
}

export const storiesOfCardGrid = storiesOfFactory<CardGridTemplates<any>, never>('Card Grid', (stories, templateMapper) => {
  const template = templateMapper((_args, { cardGridTemplate }) => cardGridTemplate(cardGridArgsMapper()));

  stories.add(
    'Card Grid',
    template
  );
});
