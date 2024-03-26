import { ComponentAnnotations, Renderer } from "@storybook/types";

import { HelpcenterPanelArgs, helpcenterPanelArgsMapper, helpcenterPanelArgTypes } from "./helpcenter-panel.args.js";
import { HelpcenterPanel } from "./helpcenter-panel.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type HelpcenterPanelStory = StoryObj<HelpcenterPanelArgs, Renderer>;

interface HelpcenterPanelStories {
  HelpcenterPanel: HelpcenterPanelStory;
}

interface HelpcenterPanelStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    HelpcenterPanelTemplates<TemplateFnReturnType>
  > {}

interface HelpcenterPanelTemplates<TemplateFnReturnType> {
  helpcenterPanelTemplate: (helpcenterPanelProperties: HelpcenterPanel) => TemplateFnReturnType;
}

export function helpcenterPanelMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  HelpcenterPanelArgs
> {
  return {
    argTypes: helpcenterPanelArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function helpcenterPanelStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: HelpcenterPanelStoriesParameters<Implementation, Templates, TemplateFnReturnType>): HelpcenterPanelStories {
  return {
    HelpcenterPanel: {
      args: {
        label: "Hulp nodig",
        url:
          window.location.origin +
          `/iframe.html?id=${
            window.location.port === "45000" ? "core-" : ""
          }helpcenter-panel--helpcenter-panel&viewMode=docs`,
      },
      render: templateContainer.render(storyTemplates, (args, { helpcenterPanelTemplate }) =>
        helpcenterPanelTemplate(helpcenterPanelArgsMapper(args)),
      ),
    },
  };
}
