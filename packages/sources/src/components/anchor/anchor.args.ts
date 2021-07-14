import { ArgTypes } from '../../stories-helpers';

import { Anchor } from './anchor.models';

export interface AnchorArgs {
  icon?: string;
  iconMode?: 'after';
  label: string;
  modifier?: string;
  url: string;
}

export const anchorArgTypes: ArgTypes<AnchorArgs> = {
  icon: {
    control: {
      type: 'string'
    }
  },
  iconMode: {
    options: [undefined, 'after'],
    control: {
      type: 'select'
    }
  },
  label: {
    control: {
      type: 'text'
    }
  },
  modifier: {
    options: [undefined, 'download', 'extern'],
    control: {
      type: 'select'
    }
  },
  url: {
    control: {
      type: 'text'
    }
  }
};

export function anchorArgsMapper(a: AnchorArgs): Anchor {
  return {
    icon: a.icon
      ? {
        icon: a.icon
      }
      : undefined,
    iconMode: a.iconMode,
    label: a.label,
    modifier: a.modifier,
    url: a.url
  };
}
