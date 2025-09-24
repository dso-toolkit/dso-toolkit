import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { TijdreisBannerArgs, tijdreisBannerArgs } from "./tijdreis-banner.args";

interface TijdreisBannerStories {
  Default: StoryObj<TijdreisBannerArgs, Renderer>;
}

interface TijdreisBannerStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    TijdreisBannerTemplates<TemplateFnReturnType>
  > {}

interface TijdreisBannerTemplates<TemplateFnReturnType> {
  tijdreisBannerTemplate: (tijdreisBannerProperties: {}) => TemplateFnReturnType;
}

export function tijdreisBannerMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    args: {
      click: fn(),
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

export function tijdreisBannerStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: TijdreisBannerStoriesParameters<Implementation, Templates, TemplateFnReturnType>): TijdreisBannerStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { tijdreisBannerTemplate }) =>
        tijdreisBannerTemplate(tijdreisBannerArgs(args)),
      ),
    },
  };
}
