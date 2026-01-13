import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ResponsiveElementArgs, responsiveElementArgTypes } from "./responsive-element.args.js";

const demoGrid = [
  ["col-md-6", "col-md-6"],
  ["col-lg-3 col-md-6 col-xs-12", "col-lg-9 col-md-6 col-xs-12"],
  ["col-lg-12"],
  ["col-xs-3", "col-xs-3", "col-xs-3", "col-xs-3"],
];

type ResponsiveElementTemplateFnType<TemplateFnReturnType> = (
  dsoSizeChange: (event: CustomEvent<string>) => void,
  grid: string[][],
) => TemplateFnReturnType;

interface ResponsiveElementStories {
  ResponsiveElement: StoryObj<ResponsiveElementArgs, Renderer>;
}

export interface ResponsiveElementTemplates<TemplateFnReturnType> {
  gridTemplate: ResponsiveElementTemplateFnType<TemplateFnReturnType>;
}

interface ResponsiveElementStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  ResponsiveElementTemplates<TemplateFnReturnType>
> {}

export function responsiveElementMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ResponsiveElementArgs
> {
  return {
    argTypes: responsiveElementArgTypes,
    args: {
      dsoSizeChange: fn(),
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

export function responsiveElementStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ResponsiveElementStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ResponsiveElementStories {
  return {
    ResponsiveElement: {
      render: templateContainer.render(storyTemplates, (args: ResponsiveElementArgs, { gridTemplate }) =>
        gridTemplate(args.dsoSizeChange, demoGrid),
      ),
    },
  };
}
