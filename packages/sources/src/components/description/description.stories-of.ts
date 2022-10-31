import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import {
  DescriptionArgs,
  descriptionArgsMapper,
  descriptionArgTypes,
  DescriptionExampleArgs,
  descriptionExampleArgTypes,
} from "./description.args";
import { termContent, descriptionExample } from "./description.content";
import { Description } from "./description.models";

export interface DescriptionTemplates<TemplateFnReturnType> {
  descriptionTemplate: (descriptionProperties: Description) => TemplateFnReturnType;
  exampleTemplate: (exampleData: ReturnType<typeof descriptionExample>) => TemplateFnReturnType;
}

export function storiesOfDescription<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DescriptionTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Description", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: descriptionArgTypes,
    });

    stories.add(
      "term",
      templateMapper<DescriptionArgs>((args, { descriptionTemplate }) =>
        descriptionTemplate(descriptionArgsMapper(args))
      ),
      {
        argTypes: descriptionArgTypes,
        args: termContent,
      }
    );

    stories.add(
      "example",
      templateMapper<DescriptionExampleArgs>((args, { exampleTemplate }) =>
        exampleTemplate(descriptionExample(args.openTerm))
      ),
      {
        argTypes: descriptionExampleArgTypes,
        args: {
          openTerm: false,
        },
      }
    );
  });
}
