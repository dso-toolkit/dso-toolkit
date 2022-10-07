import { DecoratorFunction } from '@storybook/addons';
import { storiesOfFactory } from '../../storybook/stories-of-factory';
import { HighlightBox } from '../highlight-box/highlight-box.models';
import { Tile } from '../tile/tile.models';
import { Whitebox } from '../whitebox/whitebox.models';

import { rowEqualHeightsArgTypes, RowEqualHeightsArgs } from './row-equal-heights.args';
import { tiles, whiteboxes, highlightBoxes } from './row-equal-heights.content';

export interface RowEqualHeightsTemplates<TemplateFnReturnType> {
  highlightBoxExample: (highlightboxes: HighlightBox<string>[]) => TemplateFnReturnType;
  tileExample: (tiles: Tile[]) => TemplateFnReturnType;
  whiteboxExample: (whiteboxes: Whitebox[]) => TemplateFnReturnType;
}

interface RowEqualHeightsParameters<TemplateFnReturnType> {
  decorator: DecoratorFunction<TemplateFnReturnType>;
}

export const storiesOfRowEqualHeights = storiesOfFactory<RowEqualHeightsTemplates<any>, RowEqualHeightsArgs, RowEqualHeightsParameters<any>>('Row Equal Heights', (stories, templateMapper, { decorator }) => {
  stories
    .addParameters({
      argTypes: rowEqualHeightsArgTypes
    })
    .addParameters({
      controls: {
        hideNoControlsWarning: true,
      }
    })
    .addDecorator(decorator);

  stories.add(
    'highlight boxes',
    templateMapper((_args, { highlightBoxExample }) => highlightBoxExample(highlightBoxes))
  );

  stories.add(
    'tiles',
    templateMapper((_args, { tileExample }) => tileExample(tiles))
  );

  stories.add(
    'whiteboxes',
    templateMapper((_args, { whiteboxExample }) => whiteboxExample(whiteboxes))
  );
});
