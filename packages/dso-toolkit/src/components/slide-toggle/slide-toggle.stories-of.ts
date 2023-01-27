import { v4 as uuidv4 } from "uuid";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { SlideToggleArgs, slideToggleArgsMapper, slideToggleArgTypes } from "./slide-toggle.args.js";
import { SlideToggle } from "./slide-toggle.models.js";

export interface SlideToggleTemplates<TemplateFnReturnType> {
  slideToggleTemplate: (slideToggleProperties: SlideToggle) => TemplateFnReturnType;
}

export function storiesOfSlideToggle<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    SlideToggleTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Slide Toggle", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: slideToggleArgTypes,
      args: {
        checked: false,
        disabled: false,
        identifier: uuidv4(),
      },
    });

    const template = templateMapper<SlideToggleArgs>((args, { slideToggleTemplate }) =>
      slideToggleTemplate(slideToggleArgsMapper(args))
    );

    stories.add("Slide Toggle", template, {
      args: {
        checked: false,
        disabled: false,
      },
    });

    return stories;
  });
}
