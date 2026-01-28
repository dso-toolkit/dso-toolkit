import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { HighlightBoxArgs, highlightBoxArgTypes, highlightBoxArgsMapper } from "./highlight-box.args.js";
import { HighlightBox, HighlightBoxColor } from "./highlight-box.models.js";

type HighlightBoxStory = StoryObj<HighlightBoxArgs, Renderer>;

interface HighlightBoxStories {
  Default: HighlightBoxStory;
  Yellow: HighlightBoxStory;
  Green: HighlightBoxStory;
  Grey: HighlightBoxStory;
  GreyWithBorder: HighlightBoxStory;
  WhiteWithDropshadow: HighlightBoxStory;
  WithBorder: HighlightBoxStory;
  WithIcon: HighlightBoxStory;
  WithBannerImage: HighlightBoxStory;
}

interface HighlightBoxStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
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
      color: HighlightBoxColor.grey,
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
        color: HighlightBoxColor.yellow,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    Green: {
      args: {
        color: HighlightBoxColor.green,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    Grey: {
      args: {
        color: HighlightBoxColor.grey,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    GreyWithBorder: {
      args: {
        color: HighlightBoxColor.grey,
        border: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    WhiteWithDropshadow: {
      args: {
        color: HighlightBoxColor.white,
        dropShadow: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    WithBorder: {
      args: {
        color: HighlightBoxColor.white,
        border: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content)),
      ),
    },
    WithIcon: {
      args: {
        color: HighlightBoxColor.yellow,
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
