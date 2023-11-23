import { Addon_DecoratorFunction } from "@storybook/types";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { ScrollableArgs, scrollableArgsMapper, scrollableArgTypes } from "./scrollable.args.js";
import { Scrollable } from "./scrollable.models.js";

export interface ScrollableTemplates<TemplateFnReturnType> {
  scrollableTemplate: (scrollableProperties: Scrollable<TemplateFnReturnType>) => TemplateFnReturnType;
  defaultContent: TemplateFnReturnType;
  dynamicContent: TemplateFnReturnType;
}

export interface ScrollableParameters<TemplateFnReturnType> {
  decorator: Addon_DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfScrollable<Implementation, Templates, TemplateFnReturnType>(
  storyFunctionArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ScrollableTemplates<TemplateFnReturnType>
  >,
  { decorator }: ScrollableParameters<TemplateFnReturnType>,
) {
  return storiesOfFactory("Scrollable", storyFunctionArguments, (stories, templateMapper) => {
    stories
      .addParameters({
        argTypes: scrollableArgTypes,
        args: {},
        html: {
          root: "#scrollable-mock",
        },
        layout: "fullscreen",
      })
      .addDecorator(decorator);

    stories.add(
      "default",
      templateMapper<ScrollableArgs>((args, { scrollableTemplate, defaultContent }) =>
        scrollableTemplate(scrollableArgsMapper(args, defaultContent)),
      ),
    );

    stories.add(
      "dynamic content",
      templateMapper<ScrollableArgs>((args, { scrollableTemplate, dynamicContent }) =>
        scrollableTemplate(scrollableArgsMapper(args, dynamicContent)),
      ),
    );

    return stories;
  });
}
