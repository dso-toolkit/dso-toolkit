import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { HighlightBoxArgs, highlightBoxArgTypes, highlightBoxArgsMapper } from "./highlight-box.args.js";
import { HighlightBox } from "./highlight-box.models.js";

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
  stepContent: TemplateFnReturnType;
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
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content, stepContent }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content, stepContent)),
      ),
    },
    Yellow: {
      args: {
        yellow: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content, stepContent }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content, stepContent)),
      ),
    },
    Green: {
      args: {
        green: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content, stepContent }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content, stepContent)),
      ),
    },
    Grey: {
      args: {
        grey: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content, stepContent }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content, stepContent)),
      ),
    },
    GreyWithBorder: {
      args: {
        grey: true,
        border: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content, stepContent }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content, stepContent)),
      ),
    },
    WhiteWithDropshadow: {
      args: {
        white: true,
        dropShadow: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content, stepContent }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content, stepContent)),
      ),
    },
    WithBorder: {
      args: {
        border: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content, stepContent }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content, stepContent)),
      ),
    },
    WithIcon: {
      args: {
        yellow: true,
        icon: "plus",
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content, stepContent }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content, stepContent)),
      ),
    },
    WithBannerImage: {
      args: {
        bannerImage: true,
      },
      render: templateContainer.render(storyTemplates, (args, { highlightBoxTemplate, content, stepContent }) =>
        highlightBoxTemplate(highlightBoxArgsMapper(args, content, stepContent)),
      ),
    },
  };
}
