import { DecoratorFunction } from "@storybook/addons";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { ExpandableArgs, expandableArgsMapper, expandableArgTypes } from "./expandable.args.js";
import { Expandable } from "./expandable.models.js";

export interface ExpandableTemplates<TemplateFnReturnType> {
  expandableTemplate: (expandableProperties: Expandable<TemplateFnReturnType>) => TemplateFnReturnType;
  expandableContent: TemplateFnReturnType;
}

export interface ExpandableParameters<TemplateFnReturnType> {
  decorator: DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfExpandable<Implementation, Templates, TemplateFnReturnType>(
  storyFunctionArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ExpandableTemplates<TemplateFnReturnType>
  >,
  { decorator }: ExpandableParameters<TemplateFnReturnType>
) {
  return storiesOfFactory("Expandable", storyFunctionArguments, (stories, templateMapper) => {
    stories
      .addParameters({
        argTypes: expandableArgTypes,
        args: {},
        html: {
          root: "#expandable-mock",
        },
        layout: "fullscreen",
      })
      .addDecorator(decorator);

    stories.add(
      "default",
      templateMapper<ExpandableArgs>((args, { expandableTemplate, expandableContent }) =>
        expandableTemplate(expandableArgsMapper(args, expandableContent))
      ),
      {
        args: {
          open: false,
        },
      }
    );

    stories.add(
      "with animation",
      templateMapper<ExpandableArgs>((args, { expandableTemplate, expandableContent }) => {
        return expandableTemplate(expandableArgsMapper(args, expandableContent));
      }),
      {
        args: {
          open: false,
          enableAnimation: true,
        },
      }
    );

    return stories;
  });
}
