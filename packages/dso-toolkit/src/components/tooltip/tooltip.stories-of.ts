import { compiler } from "markdown-to-jsx";
import { HandlerFunction } from "storybook/actions";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { v4 as uuidv4 } from "uuid";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { TooltipArgs, tooltipArgTypes, tooltipArgsMapper } from "./tooltip.args.js";
import { Tooltip } from "./tooltip.models.js";

type TooltipStory = StoryObj<TooltipArgs, Renderer>;

interface TooltipStories {
  AsChild: TooltipStory;
  AsSibling: TooltipStory;
}

interface TooltipStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  TooltipTemplates<TemplateFnReturnType>
> {}

interface TooltipTemplates<TemplateFnReturnType> {
  tooltipTemplate: (tooltipProperties: Tooltip) => TemplateFnReturnType;
  asChildTemplate: (tooltip: TemplateFnReturnType, id: string, action: HandlerFunction) => TemplateFnReturnType;
  asSiblingTemplate: (tooltip: TemplateFnReturnType, id: string, action: HandlerFunction) => TemplateFnReturnType;
}

export function tooltipMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  TooltipArgs
> {
  return {
    argTypes: tooltipArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function tooltipStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: TooltipStoriesParameters<Implementation, Templates, TemplateFnReturnType>): TooltipStories {
  return {
    AsChild: {
      args: {
        id: uuidv4(),
        position: "right",
      },
      render: templateContainer.render(storyTemplates, (args, { tooltipTemplate, asChildTemplate }) =>
        asChildTemplate(tooltipTemplate(tooltipArgsMapper(args)), args.id, args.action),
      ),
    },
    AsSibling: {
      args: {
        id: uuidv4(),
        position: "bottom",
      },
      render: templateContainer.render(storyTemplates, (args, { tooltipTemplate, asSiblingTemplate }) =>
        asSiblingTemplate(tooltipTemplate(tooltipArgsMapper(args)), args.id, args.action),
      ),
    },
  };
}
