import { StorybookParameters } from '../../stories-helpers';

import { tileGridArgTypes } from './tile-grid.args';
import { Tile } from '../..';
import { tiles } from './tile-grid.content';

export interface TileGridParameters<TemplateFnReturnType> {
  tileGridDemoTemplate: (children: Tile[]) => TemplateFnReturnType;
}

export function storiesOfTileGrid<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    tileGridDemoTemplate
  }: TileGridParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Tile Grid', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: tileGridArgTypes,
      controls: {
        hideNoControlsWarning: true
      }
    });

  stories.add(
    'Tile Grid',
    () => tileGridDemoTemplate(tiles)
  );
}
