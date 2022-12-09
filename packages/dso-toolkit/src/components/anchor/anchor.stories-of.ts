import { storiesOfFactory, StoriesOfArguments } from "../../storybook/index.js";

import { AnchorArgs, anchorArgsMapper, anchorArgTypes } from "./anchor.args.js";
import { Anchor } from "./anchor.models.js";

export interface AnchorTemplates<TemplateFnReturnType> {
  anchorTemplate: (anchorProperties: Anchor) => TemplateFnReturnType;
}

export function storiesOfAnchor<Implementation, Templates, TemplateFnReturnType>(
  storyFunctionArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AnchorTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Anchor", storyFunctionArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: anchorArgTypes,
    });

    const template = templateMapper<AnchorArgs>((args, { anchorTemplate }) => anchorTemplate(anchorArgsMapper(args)));

    stories.add("default", template, {
      args: {
        label: "Home",
        url: "#",
      },
    });

    stories.add("download link", template, {
      args: {
        label: "Download Afvalkalender 2017",
        url: "afvalkalender.pdf",
        modifier: "download",
      },
    });

    stories.add("external link", template, {
      args: {
        label: "Een link naar Google",
        url: "http://www.google.nl",
        modifier: "extern",
      },
    });

    stories.add("link with icon", template, {
      args: {
        label: "Product zoeken",
        url: "#",
        icon: "search",
      },
    });

    return stories;
  });
}
