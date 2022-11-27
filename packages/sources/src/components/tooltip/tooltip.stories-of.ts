import { HandlerFunction } from "@storybook/addon-actions";
import { v4 as uuidv4 } from "uuid";

import { TooltipArgs, tooltipArgsMapper, tooltipArgTypes } from "./tooltip.args";
import { Tooltip } from "./tooltip.models";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

export interface TooltipTemplates<TemplateFnReturnType> {
  tooltipTemplate: (tooltipProperties: Tooltip) => TemplateFnReturnType;
  asChildTemplate: (tooltip: TemplateFnReturnType, action: HandlerFunction) => TemplateFnReturnType;
  asSiblingTemplate: (tooltip: TemplateFnReturnType, id: string, action: HandlerFunction) => TemplateFnReturnType;
}

export function storiesOfTooltip<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    TooltipTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Tooltip", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: tooltipArgTypes,
    });

    stories.add(
      "as child",
      templateMapper<TooltipArgs>((args, { tooltipTemplate, asChildTemplate }) =>
        asChildTemplate(tooltipTemplate(tooltipArgsMapper(args)), args.action)
      ),
      {
        args: {
          position: "right",
        },
      }
    );

    stories.add(
      "as sibling",
      templateMapper<TooltipArgs>((args, { tooltipTemplate, asSiblingTemplate }) =>
        asSiblingTemplate(tooltipTemplate(tooltipArgsMapper(args)), args.id, args.action)
      ),
      {
        args: {
          id: uuidv4(),
          position: "bottom",
        },
      }
    );

    stories.add(
      "tooltip",
      templateMapper<TooltipArgs>((args, { tooltipTemplate }) => tooltipTemplate(tooltipArgsMapper(args))),
      {
        args: {
          position: "bottom",
        },
      }
    );

    return stories;
  });
}
