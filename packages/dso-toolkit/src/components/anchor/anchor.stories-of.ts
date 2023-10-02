import { WebComponentsRenderer } from "@storybook/web-components";

import { AnchorArgs, anchorArgsMapper } from "./anchor.args.js";
import { Anchor } from "./anchor.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";

type AnchorStory = StoryObj<AnchorArgs, WebComponentsRenderer>;

interface AnchorStories {
  Default: AnchorStory;
  DownloadLink: AnchorStory;
  ExternalLink: AnchorStory;
  LinkWithIcon: AnchorStory;
}

interface AnchorStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, AnchorTemplates<TemplateFnReturnType>> {}

interface AnchorTemplates<TemplateFnReturnType> {
  anchorTemplate: (anchorProperties: Anchor) => TemplateFnReturnType;
}

export function anchorStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: AnchorStoriesParameters<Implementation, Templates, TemplateFnReturnType>): AnchorStories {
  return {
    Default: {
      args: {
        label: "Home",
        url: "#",
      },
      render: templateContainer.render(storyTemplates, (args, { anchorTemplate }) =>
        anchorTemplate(anchorArgsMapper(args))
      ),
    },
    DownloadLink: {
      args: {
        label: "Download Afvalkalender 2017",
        url: "afvalkalender.pdf",
        modifier: "download",
      },
      render: templateContainer.render(storyTemplates, (args, { anchorTemplate }) =>
        anchorTemplate(anchorArgsMapper(args))
      ),
    },
    ExternalLink: {
      args: {
        label: "Een link naar Google",
        url: "http://www.google.nl",
        modifier: "extern",
      },
      render: templateContainer.render(storyTemplates, (args, { anchorTemplate }) =>
        anchorTemplate(anchorArgsMapper(args))
      ),
    },
    LinkWithIcon: {
      args: {
        label: "Product zoeken",
        url: "#",
        icon: "search",
      },
      render: templateContainer.render(storyTemplates, (args, { anchorTemplate }) =>
        anchorTemplate(anchorArgsMapper(args))
      ),
    },
  };
}
