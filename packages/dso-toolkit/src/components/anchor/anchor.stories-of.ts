import { ComponentAnnotations, Renderer } from "@storybook/types";

import { AnchorArgs, anchorArgTypes, anchorArgsMapper } from "./anchor.args.js";
import { Anchor } from "./anchor.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type AnchorStory = StoryObj<AnchorArgs, Renderer>;

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

export function anchorMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  AnchorArgs
> {
  return {
    argTypes: anchorArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
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
        anchorTemplate(anchorArgsMapper(args)),
      ),
    },
    DownloadLink: {
      args: {
        label: "Download Afvalkalender 2017",
        url: "afvalkalender.pdf",
        mode: "download",
      },
      render: templateContainer.render(storyTemplates, (args, { anchorTemplate }) =>
        anchorTemplate(anchorArgsMapper(args)),
      ),
    },
    ExternalLink: {
      args: {
        label: "Een link naar Google",
        url: "http://www.google.nl",
        mode: "extern",
      },
      render: templateContainer.render(storyTemplates, (args, { anchorTemplate }) =>
        anchorTemplate(anchorArgsMapper(args)),
      ),
    },
    LinkWithIcon: {
      args: {
        label: "Product zoeken",
        url: "#",
        icon: "search",
      },
      render: templateContainer.render(storyTemplates, (args, { anchorTemplate }) =>
        anchorTemplate(anchorArgsMapper(args)),
      ),
    },
  };
}
