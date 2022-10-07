import { TileGridArgs, tileGridArgTypes } from './tile-grid.args';
import { Tile } from '../..';
import { tiles } from './tile-grid.content';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

export interface TileGridTemplates<TemplateFnReturnType> {
  tileGridDemoTemplate: (children: Tile[]) => TemplateFnReturnType;
}

export const storiesOfTileGrid = storiesOfFactory<TileGridTemplates<any>, TileGridArgs>('Tile Grid', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: tileGridArgTypes
  });

  stories.add(
    'Tile Grid',
    templateMapper((_args, { tileGridDemoTemplate }) => tileGridDemoTemplate(tiles))
  );
})

// export function storiesOfTileGrid<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     tileGridDemoTemplate
//   }: TileGridParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Tile Grid', parameters, tileGridArgTypes)
//     .addParameters({
//       controls: {
//         hideNoControlsWarning: true
//       }
//     });


// }
