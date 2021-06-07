import { Args, ArgsStoryFn, ArgType, ClientStoryApi } from '@storybook/addons';

/**
 * Interface which stories need to extend and every component then implements.
 * 
 * The extended interface describes the parameters needed for Storybook to create the stories.
 */
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
      throw new Error('No args found, always provide args or empty object');
    }

    return templateFn(argsMapper(a as ComponentArgs));
  }
}

export type ArgTypes<ComponentArgs> = {
  [P in keyof Required<ComponentArgs>]: ArgType;
};
