import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { PanelArgs, panelArgTypes, panelArgs, panelArgsMapper } from "./panel.args.js";
import { Panel } from "./panel.models.js";

type PanelStory = StoryObj<PanelArgs, Renderer>;

interface PanelStories {
  Default: PanelStory;
  Emphasized: PanelStory;
}

interface PanelStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  PanelTemplates<TemplateFnReturnType>
> {}

interface PanelTemplates<TemplateFnReturnType> {
  panelTemplate: (panelProperties: Panel<TemplateFnReturnType>) => TemplateFnReturnType;
  children: TemplateFnReturnType;
  heading: TemplateFnReturnType;
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
      render: templateContainer.render(storyTemplates, (args, { panelTemplate, children, heading }) =>
        panelTemplate(panelArgsMapper(args, children, heading)),
      ),
    },
    Emphasized: {
      args: { emphasized: true },
      render: templateContainer.render(storyTemplates, (args, { panelTemplate, children, heading }) =>
        panelTemplate(panelArgsMapper(args, children, heading)),
      ),
    },
  };
}
