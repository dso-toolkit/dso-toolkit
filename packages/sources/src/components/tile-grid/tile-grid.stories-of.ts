import { TileGridArgs, tileGridArgTypes } from './tile-grid.args';
import { Tile } from '../..';
import { tiles } from './tile-grid.content';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

export interface TileGridTemplates<TemplateFnReturnType> {
  tileGridDemoTemplate: (children: Tile[]) => TemplateFnReturnType;
}

export const storiesOfTileGrid = storiesOfFactory<TileGridTemplates<any>, TileGridArgs>('Tile Grid', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: tileGridArgTypes,
    controls: {
      hideNoControlsWarning: true
    }
  });

  stories.add(
    'Tile Grid',
    templateMapper((_args, { tileGridDemoTemplate }) => tileGridDemoTemplate(tiles))
  );
});
