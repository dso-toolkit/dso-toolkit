import { bindTemplate, componentArgs, StorybookParameters } from '../../stories-helpers';

import { TileArgs, tileArgsMapper, tileArgTypes } from './tile.args';
import { Tile } from './tile.models';

export interface TileParameters<TemplateFnReturnType> {
  tileTemplate: (tileProperties: Tile) => TemplateFnReturnType;
}

export function storiesOfTile<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    tileTemplate
  }: TileParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(tileArgsMapper, tileTemplate);

  const stories = storiesOf('Tile', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: componentArgs<TileArgs>({
        label: 'Boom kappen of snoeien',
        imageSource: 'images/icon-tree.png',
        imageAlt: 'Boom',
        theme: false
      }),
      argTypes: tileArgTypes
    });

  stories.add(
    'Tile',
    template
  );

  stories.add(
    'Theme tile',
    template,
    {
      args: {
        theme: true
      }
    }
  );
}
