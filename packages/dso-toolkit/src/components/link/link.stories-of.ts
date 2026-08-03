import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters2, StoryObj } from "../../template-container.js";

import { LinkArgs, linkArgTypes, linkArgsMapper } from "./link.args.js";
import { Link } from "./link.models.js";

type LinkStory = StoryObj<LinkArgs, Renderer>;

interface LinkStories {
  Default: LinkStory;
  DownloadLink: LinkStory;
  ExternalLink: LinkStory;
  LinkWithIcon: LinkStory;
  MailLinkWithIcon: LinkStory;
  PhoneLinkWithIcon: LinkStory;
}

interface LinkStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<LinkTemplates<TemplateFnReturnType>> {}

interface LinkTemplates<TemplateFnReturnType> {
  linkTemplate: (linkProperties: Link) => TemplateFnReturnType;
}

export function linkMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  LinkArgs
> {
  return {
    argTypes: linkArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function linkStories<TemplateFnReturnType>({
  storyTemplates,
}: LinkStoriesParameters<TemplateFnReturnType>): LinkStories {
  return {
    Default: {
      args: {
        label: "Home",
        url: "#",
      },
      render: (args) => storyTemplates().linkTemplate(linkArgsMapper(args)),
    },
    DownloadLink: {
      args: {
        label: "Download Afvalkalender 2017",
        url: "afvalkalender.pdf",
        mode: "download",
      },
      render: (args) => storyTemplates().linkTemplate(linkArgsMapper(args)),
    },
    ExternalLink: {
      args: {
        label: "Een link naar Google",
        url: "http://www.google.nl",
        mode: "extern",
      },
      render: (args) => storyTemplates().linkTemplate(linkArgsMapper(args)),
    },
    LinkWithIcon: {
      args: {
        label: "Product zoeken",
        url: "#",
        icon: "search",
      },
      render: (args) => storyTemplates().linkTemplate(linkArgsMapper(args)),
    },
    MailLinkWithIcon: {
      args: {
        label: "noreply@dso-toolkit.nl",
        url: "mailto:no-reply@dso-toolkit.nl",
      },
      render: (args) => storyTemplates().linkTemplate(linkArgsMapper(args)),
    },
    PhoneLinkWithIcon: {
      args: {
        label: "Bel ons",
        url: "tel:012-34567891",
      },
      render: (args) => storyTemplates().linkTemplate(linkArgsMapper(args)),
    },
  };
}
