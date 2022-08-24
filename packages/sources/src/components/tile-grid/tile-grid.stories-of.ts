import { createStories, StorybookParameters } from '../../storybook';

import { tileGridArgTypes } from './tile-grid.args';
import { Tile } from '../..';
import { tiles } from './tile-grid.content';

export interface TileGridParameters<TemplateFnReturnType> {
  tileGridDemoTemplate: (children: Tile[]) => TemplateFnReturnType;
}

export function storiesOfTileGrid<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    tileGridDemoTemplate
  }: TileGridParameters<TemplateFnReturnType>
) {
  const stories = createStories('Tile Grid', parameters, tileGridArgTypes)
    .addParameters({
      controls: {
        hideNoControlsWarning: true
      }
    });

  stories.add(
    'Tile Grid',
    () => tileGridDemoTemplate(tiles)
  );
}
