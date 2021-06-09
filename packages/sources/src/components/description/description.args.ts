import { ArgTypes } from '../../stories-helpers';

import { Description } from './description.models';

export interface DescriptionArgs {
  textBefore: string,
  textAfter: string,
  id: string;
  term: string;
  content: string;
  open: boolean;
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
  textAfter: {
    control: {
      type: 'text'
    }
  },
  textBefore: {
    control: {
      type: 'text'
    }
  }
};

export function descriptionArgsMapper(a: DescriptionArgs): Description {
  return {
    content: a.content,
    id: a.id,
    open: a.open,
    term: a.term
  };
}
