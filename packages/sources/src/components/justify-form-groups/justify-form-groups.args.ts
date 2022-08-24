import { ArgTypes } from '../../storybook';

import { content } from './justify-form-groups.content';

import { JustifyFormGroups } from './justify-form-groups.models';

export interface JustifyFormGroupsArgs {
}

export const justifyFormGroupsArgTypes: ArgTypes<JustifyFormGroupsArgs> = {
};

export function justifyFormGroupsArgsMapper(_a: JustifyFormGroupsArgs): JustifyFormGroups<any> {
  return content;
}
