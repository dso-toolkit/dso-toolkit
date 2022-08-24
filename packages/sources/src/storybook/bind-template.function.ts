import { Args, ArgsStoryFn } from '@storybook/addons';

import { ArgsError } from './args-error.error';

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
