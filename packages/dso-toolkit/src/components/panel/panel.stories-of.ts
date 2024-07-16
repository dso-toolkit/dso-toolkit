import { ComponentAnnotations, Renderer } from "@storybook/types";

import { PanelArgs, panelArgs, panelArgTypes, panelArgsMapper } from "./panel.args.js";
import { Panel } from "./panel.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type PanelStory = StoryObj<PanelArgs, Renderer>;

interface PanelStories {
  Default: PanelStory;
}

interface PanelStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, PanelTemplates<TemplateFnReturnType>> {}

interface PanelTemplates<TemplateFnReturnType> {
  panelTemplate: (panelProperties: Panel) => TemplateFnReturnType;
}

export function panelMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  PanelArgs
> {
  return {
    argTypes: panelArgTypes,
    args: panelArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function panelStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: PanelStoriesParameters<Implementation, Templates, TemplateFnReturnType>): PanelStories {
  return {
    Default: {
      args: {},
      render: templateContainer.render(storyTemplates, (args, { panelTemplate }) =>
        panelTemplate(panelArgsMapper(args)),
      ),
    },
  };
}
