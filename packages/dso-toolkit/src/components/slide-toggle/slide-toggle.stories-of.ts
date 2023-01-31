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
      args: {},
    });

    const template = templateMapper<SlideToggleArgs>((args, { slideToggleTemplate }) =>
      slideToggleTemplate(slideToggleArgsMapper(args))
    );

    stories.add("default", template, {
      args: {
        checked: false,
        accessibleLabel: "sr-only label van het schuifje",
      },
    });

    stories.add("disabled", template, {
      args: {
        checked: false,
        disabled: true,
      },
    });

    stories.add("zichtbaar label", template, {
      args: {
        checked: false,
        label: "Schuifje",
      },
    });

    stories.add("labelledbyId", template, {
      args: {
        checked: false,
        labelledbyId: uuidv4(),
      },
    });

    return stories;
  });
}
