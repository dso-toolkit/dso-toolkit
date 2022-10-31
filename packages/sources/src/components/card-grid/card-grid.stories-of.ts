import { StoriesOfArguments, storiesOfFactory } from '../../storybook/stories-of-factory';

import { cardGridArgsMapper } from './card-grid.args';
import { CardGrid } from './card-grid.models';

export interface CardGridTemplates<TemplateFnReturnType> {
  cardGridTemplate: (cardProperties: CardGrid<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfCardGrid<Implementation, Templates, TemplateFnReturnType>(storiesOfArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, CardGridTemplates<TemplateFnReturnType>>) {
  return storiesOfFactory('Card Grid', storiesOfArguments, (stories, templateMapper) => {
    const template = templateMapper((_args, { cardGridTemplate }) => cardGridTemplate(cardGridArgsMapper()));

    stories.add(
      'Card Grid',
      template
    );
  });
}
