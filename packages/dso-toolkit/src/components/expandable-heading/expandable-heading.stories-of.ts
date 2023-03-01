import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import {
  ExpandableHeadingArgs,
  expandableHeadingArgsMapper,
  expandableHeadingArgTypes,
} from "./expandable-heading.args.js";
import { ExpandableHeading } from "./expandable-heading.models.js";

export interface ExpandableHeadingTemplates<TemplateFnReturnType> {
  expandableHeadingTemplate: (
    expandableHeadingProperties: ExpandableHeading<TemplateFnReturnType>
  ) => TemplateFnReturnType;
  expandableHeading: ExpandableHeading<TemplateFnReturnType>;
  expandableHeadingWithChildList: ExpandableHeading<TemplateFnReturnType>;
}

export function storiesOfExpandableHeading<Implementation, Templates, TemplateFnReturnType>(
  storyFunctionArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ExpandableHeadingTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Expandable Heading", storyFunctionArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: expandableHeadingArgTypes,
      args: {},
    });

    stories.add(
      "default",
      templateMapper<ExpandableHeadingArgs>((args, { expandableHeadingTemplate, expandableHeading }) =>
        expandableHeadingTemplate(expandableHeadingArgsMapper(args, expandableHeading))
      ),
      {
        args: {
          heading: "h3",
        },
      }
    );

    stories.add(
      "with child list",
      templateMapper<ExpandableHeadingArgs>((args, { expandableHeadingTemplate, expandableHeadingWithChildList }) => {
        return expandableHeadingTemplate(expandableHeadingArgsMapper(args, expandableHeadingWithChildList));
      }),
      {
        args: {
          heading: "h3",
        },
      }
    );

    return stories;
  });
}
