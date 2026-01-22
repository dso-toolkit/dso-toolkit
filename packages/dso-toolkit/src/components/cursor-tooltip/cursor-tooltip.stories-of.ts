import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { CursorTooltipArgs, cursorTooltipArgs, cursorTooltipArgTypes, cursorTooltipArgsMapper } from "./cursor-tooltip.args.js";
import { CursorTooltip } from "./cursor-tooltip.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type CursorTooltipStory = StoryObj<CursorTooltipArgs, Renderer>;

interface CursorTooltipStories {
  Default: CursorTooltipStory;
}

interface CursorTooltipStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    CursorTooltipTemplates<TemplateFnReturnType>
  > {}

interface CursorTooltipTemplates<TemplateFnReturnType> {
  cursorTooltipTemplate: (cursorTooltipProperties: CursorTooltip) => TemplateFnReturnType;
}

export function cursorTooltipMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  CursorTooltipArgs
> {
  return {
    argTypes: cursorTooltipArgTypes,
    args: cursorTooltipArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function cursorTooltipStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: CursorTooltipStoriesParameters<Implementation, Templates, TemplateFnReturnType>): CursorTooltipStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { cursorTooltipTemplate }) =>
        cursorTooltipTemplate(cursorTooltipArgsMapper(args)),
      ),
    },
  };
}
