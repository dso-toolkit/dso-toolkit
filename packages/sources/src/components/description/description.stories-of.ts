import { Args } from '@storybook/addons';

import { bindTemplate, ArgsError, StorybookParameters, createStories } from '../../storybook';

import { descriptionArgsMapper, descriptionArgTypes, DescriptionExampleArgs, descriptionExampleArgTypes } from './description.args';
import { termContent, descriptionExample } from './description.content';
import { Description } from './description.models';

export interface DescriptionParameters<TemplateFnReturnType> {
  descriptionTemplate: (descriptionProperties: Description) => TemplateFnReturnType;
  exampleTemplate: (exampleData: ReturnType<typeof descriptionExample>) => TemplateFnReturnType;
}

export function storiesOfDescription<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    descriptionTemplate,
    exampleTemplate
  }: DescriptionParameters<TemplateFnReturnType>
) {
  const stories = createStories('Description', parameters, {});

  stories.add(
    'term',
    bindTemplate(descriptionArgsMapper, descriptionTemplate),
    {
      argTypes: descriptionArgTypes,
      args: termContent
    }
  );

  stories.add(
    'example',
    (a: Args | undefined) => {
      if (!a) {
        throw new ArgsError();
      }

      const args = a as DescriptionExampleArgs;

      return exampleTemplate(descriptionExample(args.openTerm));
    },
    {
      argTypes: descriptionExampleArgTypes,
      args: {
        openTerm: false
      }
    }
  );
}
