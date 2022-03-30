import { ArgTypes } from '../../stories-helpers';

import { Tile } from './tile.models';

export interface TileArgs {
  label: string;
  imageSource: string;
  imageAlt: string;
  theme: boolean;
}

export const tileArgTypes: ArgTypes<TileArgs> = {
  label: {
    control: {
      type: 'text'
    }
  },
  imageSource: {
    control: {
      disable: true
    }
  },
  imageAlt: {
    control: {
      type: 'text'
    }
  },
  theme: {
    control: {
      type: 'boolean'
    }
  }
};

export function tileArgsMapper(a: TileArgs): Tile {
  return {
    anchor: '#',
    label: a.label,
    image: {
      source: a.imageSource,
      alt: a.imageAlt
    },
    theme: a.theme
  };
}
