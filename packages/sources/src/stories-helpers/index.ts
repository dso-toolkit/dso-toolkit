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
