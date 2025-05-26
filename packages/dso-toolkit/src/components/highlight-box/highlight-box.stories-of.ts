import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { HighlightBoxArgs, highlightBoxArgTypes, highlightBoxArgsMapper } from "./highlight-box.args.js";
import { HighlightBox } from "./highlight-box.models.js";

type HighlightBoxStory = StoryObj<HighlightBoxArgs, Renderer>;

interface HighlightBoxStories {
  Default: HighlightBoxStory;
  Yellow: HighlightBoxStory;
  Grey: HighlightBoxStory;
  GreyWithBorder: HighlightBoxStory;
  WhiteWithDropshadow: HighlightBoxStory;
  WithBorder: HighlightBoxStory;
  WithIcon: HighlightBoxStory;
  WithBannerImage: HighlightBoxStory;
}

interface HighlightBoxStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    HighlightBoxTemplates<TemplateFnReturnType>
  > {}

interface HighlightBoxTemplates<TemplateFnReturnType> {
  highlightBoxTemplate: (highlightBoxProperties: HighlightBox<TemplateFnReturnType>) => TemplateFnReturnType;
  content: TemplateFnReturnType;
}

export function highlightBoxMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  HighlightBoxArgs
> {
  return {
    argTypes: highlightBoxArgTypes,
    args: {
      yellow: false,
      white: false,
      border: false,
      dropShadow: false,
      bannerImage: false,
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function highlightBoxStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: HighlightBoxStoriesParameters<Implementation, Templates, TemplateFnReturnType>): HighlightBoxStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    Yellow: {
      args: {
        yellow: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    Grey: {
      args: {
        grey: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    GreyWithBorder: {
      args: {
        grey: true,
        border: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    WhiteWithDropshadow: {
      args: {
        white: true,
        dropShadow: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    WithBorder: {
      args: {
        border: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    WithIcon: {
      args: {
        yellow: true,
        icon: "plus",
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    WithBannerImage: {
      args: {
        bannerImage: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
  };
}
