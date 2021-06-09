import { ArgTypes } from '../../stories-helpers';

import { Definition, DefinitionList } from './definition-list.models';

export interface DefinitionListArgs {
  modifier?: string;
  definitions: Definition[];
}

export const definitionListArgTypes: ArgTypes<DefinitionListArgs> = {
  definitions: {
    control: {
      disable: true
    }
  },
  modifier: {
    control: {
      type: 'text'
    }
  }
};

export function definitionListArgsMapper(a: DefinitionListArgs): DefinitionList {
  return {
    definitions: a.definitions,
    modifier: a.modifier
  };
}
