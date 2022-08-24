import { DecoratorFunction } from '@storybook/addons';
import { createStories, StorybookParameters } from '../../storybook';
import { HighlightBox } from '../highlight-box/highlight-box.models';
import { Tile } from '../tile/tile.models';
import { Whitebox } from '../whitebox/whitebox.models';

import { rowEqualHeightsArgTypes } from './row-equal-heights.args';
import { tiles, whiteboxes, highlightBoxes } from './row-equal-heights.content';

export interface RowEqualHeightsParameters<TemplateFnReturnType> {
  highlightBoxExample: (highlightboxes: HighlightBox<string>[]) => TemplateFnReturnType;
  tileExample: (tiles: Tile[]) => TemplateFnReturnType;
  whiteboxExample: (whiteboxes: Whitebox[]) => TemplateFnReturnType;
  decorator: DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfRowEqualHeights<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    highlightBoxExample,
    tileExample,
    whiteboxExample,
    decorator
  }: RowEqualHeightsParameters<TemplateFnReturnType>
) {
  const stories = createStories('Row Equal Heights', parameters, rowEqualHeightsArgTypes)
    .addParameters({
      controls: {
        hideNoControlsWarning: true,
      }
    })
    .addDecorator(decorator);

    stories.add(
      'highlight boxes',
      () => highlightBoxExample(highlightBoxes)
    );

    stories.add(
      'tiles',
      () => tileExample(tiles)
    );

    stories.add(
      'whiteboxes',
      () => whiteboxExample(whiteboxes)
    );
}
