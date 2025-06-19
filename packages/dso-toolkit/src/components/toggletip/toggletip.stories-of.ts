import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { ToggletipArgs, toggletipArgTypes, toggletipArgsMapper } from "./toggletip.args.js";
import { Toggletip } from "./toggletip.models.js";

interface ToggletipStories {
  Toggletip: StoryObj<ToggletipArgs, Renderer>;
}

interface ToggletipStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ToggletipTemplates<TemplateFnReturnType>
  > {}

export interface ToggletipTemplates<TemplateFnReturnType> {
  toggletipTemplate: (toggletipProperties: Toggletip<TemplateFnReturnType>) => TemplateFnReturnType;
  children: TemplateFnReturnType;
}

export function toggletipMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ToggletipArgs
> {
  return {
    argTypes: toggletipArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function toggletipStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ToggletipStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ToggletipStories {
  return {
    Toggletip: {
      args: {
        mode: "toggle",
        position: "right",
        strategy: "absolute",
        small: false,
        label: "Toelichting",
        badgeStatus: "primary",
        icon: "help",
        iconActive: "help-active",
      },
      render: templateContainer.render(storyTemplates, (args, { toggletipTemplate, children }) =>
        toggletipTemplate({
          ...toggletipArgsMapper(args, children),
          withContainer: true,
        }),
      ),
    },
  };
}
