import { DecoratorFunction } from "@storybook/addons";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { ScrollContainerArgs, scrollContainerArgsMapper, scrollContainerArgTypes } from "./scroll-container.args.js";
import { ScrollContainer } from "./scroll-container.models.js";

export interface ScrollContainerTemplates<TemplateFnReturnType> {
  scrollContainerTemplate: (scrollContainerProperties: ScrollContainer<TemplateFnReturnType>) => TemplateFnReturnType;
  defaultContent: TemplateFnReturnType;
  dynamicContent: TemplateFnReturnType;
}

export interface ScrollContainerParameters<TemplateFnReturnType> {
  decorator: DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfScrollContainer<Implementation, Templates, TemplateFnReturnType>(
  storyFunctionArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ScrollContainerTemplates<TemplateFnReturnType>
  >,
  { decorator }: ScrollContainerParameters<TemplateFnReturnType>
) {
  return storiesOfFactory("Scroll Container", storyFunctionArguments, (stories, templateMapper) => {
    stories
      .addParameters({
        argTypes: scrollContainerArgTypes,
        args: {},
        html: {
          root: "#scroll-container-mock",
        },
        layout: "fullscreen",
      })
      .addDecorator(decorator);

    stories.add(
      "default",
      templateMapper<ScrollContainerArgs>((args, { scrollContainerTemplate, defaultContent }) =>
        scrollContainerTemplate(scrollContainerArgsMapper(args, defaultContent))
      )
    );

    stories.add(
      "dynamic content",
      templateMapper<ScrollContainerArgs>((args, { scrollContainerTemplate, dynamicContent }) =>
        scrollContainerTemplate(scrollContainerArgsMapper(args, dynamicContent))
      )
    );

    return stories;
  });
}
