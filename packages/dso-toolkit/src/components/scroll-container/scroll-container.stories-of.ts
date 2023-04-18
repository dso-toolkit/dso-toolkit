import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { ScrollContainerArgs, scrollContainerArgsMapper, scrollContainerArgTypes } from "./scroll-container.args.js";
import { ScrollContainer } from "./scroll-container.models.js";

export interface ScrollContainerTemplates<TemplateFnReturnType> {
  scrollContainerTemplate: (scrollContainerProperties: ScrollContainer) => TemplateFnReturnType;
}

export function storiesOfScrollContainer<Implementation, Templates, TemplateFnReturnType>(
  storyFunctionArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ScrollContainerTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Scroll Container", storyFunctionArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: scrollContainerArgTypes,
      args: {
      },
    });

    stories.add(
      "default",
      templateMapper<ScrollContainerArgs>((args, {scrollContainerTemplate }) =>
      scrollContainerTemplate(scrollContainerArgsMapper(args))
      ),
    );

    return stories;
  });
}
