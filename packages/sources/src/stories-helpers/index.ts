import { Args, ArgsStoryFn, ArgType, ClientStoryApi } from '@storybook/addons';

export class ArgsError extends Error {
  constructor() {
    super('No args found, always provide args or empty object');

    this.name = 'ArgsError';
  }
}

export interface StorybookParameters {
  module: NodeModule;
  storiesOf: ClientStoryApi<any>['storiesOf'];
  readme: string;
}

export function bindTemplate<
  ComponentProperties,
  ComponentArgs,
  TemplateFnReturnType
>(
  argsMapper: (properties: ComponentArgs) => ComponentProperties,
  templateFn: (properties: ComponentProperties) => TemplateFnReturnType
): ArgsStoryFn<TemplateFnReturnType> {
  return (a: Args | undefined) => {
    if (!a) {
      throw new ArgsError();
    }

    return templateFn(argsMapper(a as ComponentArgs));
  }
}

export type ArgTypes<ComponentArgs> = {
  [P in keyof Required<ComponentArgs>]: ArgType;
};

/**
 * Storybook's control type "check" (possibly other enum typed controls as well) return (undefined | string[] | T), the component that's
 * being storied can't handle that
 * @param checked
 * Storybook input.
 *
 * @param items
 * Array to map from.
 *
 * @param selector
 * Identifier function to map Storybook values with.
 *
 * @returns
 * New array with original values from `items`.
 */
 export function checkFix<T>(
  checked: T | string[] | undefined,
  items: T[],
  selector: (value: T) => string
): T[] {
  if (checked === undefined) {
    return [];
  }

  if (Array.isArray(checked)) {
    return checked
      .map(id => items.find(i => selector(i) === id))
      .filter((item): item is T => !!item);
  }

  return [checked];
}
