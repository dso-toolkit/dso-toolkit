import { ComponentAnnotations, Renderer } from "@storybook/types";

import { ResponsiveElementArgs, responsiveElementArgTypes } from "./responsive-element.args.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { compiler } from "markdown-to-jsx";

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

interface ResponsiveElementStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
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
