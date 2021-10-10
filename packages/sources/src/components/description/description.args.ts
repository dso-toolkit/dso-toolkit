import { ArgTypes } from '../../stories-helpers';

import { Description } from './description.models';

export interface DescriptionArgs {
  id: string;
  term: string;
  content: string;
  open: boolean;
  type: 'term' | 'note';
}

export const descriptionArgTypes: ArgTypes<DescriptionArgs> = {
  term: {
    control: {
      type: 'text',
      required: true
    }
  },
  content: {
    control: {
      type: 'text',
      required: true
    }
  },
  id: {
    control: {
      type: 'text',
      required: true
    }
  },
  open: {
    control: {
      type: 'boolean'
    }
  },
  type: {
    options: ['term', 'note'],
    control: {
      type: 'select'
    }
  }
};

export function descriptionArgsMapper(a: DescriptionArgs): Description {
  return {
    content: a.content,
    id: a.id,
    open: a.open,
    term: a.term,
    type: a.type
  };
}

export interface DescriptionExampleArgs {
  openTerm: boolean;
  openNote: boolean;
}

export const descriptionExampleArgTypes: ArgTypes<DescriptionExampleArgs> = {
  openTerm: {
    control: {
      type: 'boolean'
    }
  },
  openNote: {
    control: {
      type: 'boolean'
    }
  }
};
