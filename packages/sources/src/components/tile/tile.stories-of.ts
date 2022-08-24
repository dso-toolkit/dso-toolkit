import { bindTemplate, componentArgs, createStories, StorybookParameters } from '../../storybook';

import { TileArgs, tileArgsMapper, tileArgTypes } from './tile.args';
import { Tile } from './tile.models';

export interface TileParameters<TemplateFnReturnType> {
  tileTemplate: (tileProperties: Tile) => TemplateFnReturnType;
}

export function storiesOfTile<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    tileTemplate
  }: TileParameters<TemplateFnReturnType>
) {
  const stories = createStories('Tile', parameters, tileArgTypes)
    .addParameters({
      args: componentArgs<TileArgs>({
        label: 'Boom kappen of snoeien',
        imageSource: 'images/icon-tree.png',
        imageAlt: 'Boom'
      })
    });

  const template = bindTemplate(tileArgsMapper, tileTemplate);

  stories.add(
    'default',
    template
  );

  stories.add(
    'theme',
    template,
    {
      args: componentArgs<Pick<TileArgs, 'variant'>>({
        variant: 'theme'
      })
    }
  );
}
