import { Parameters } from "@storybook/addons";
import { componentArgs } from "../../storybook";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { ozonContentArgTypes, ozonContentArgsMapper, OzonContentArgs } from "./ozon-content.args";
import { content } from "./ozon-content.content";
import { OzonContent } from "./ozon-content.models";

export interface OzonContentTemplates<TemplateFnReturnType> {
  ozonContentTemplate: (ozonContentProperties: OzonContent) => TemplateFnReturnType;
}

export function storiesOfOzonContent<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    OzonContentTemplates<TemplateFnReturnType>
  >,
  parameters?: Parameters
) {
  return storiesOfFactory("Ozon Content", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: ozonContentArgTypes,
      ...parameters,
    });

    const template = templateMapper<OzonContentArgs>((args, { ozonContentTemplate }) =>
      ozonContentTemplate(ozonContentArgsMapper(args))
    );

    content.forEach((story) => {
      stories.add(story.title, template, {
        args: componentArgs<Omit<OzonContentArgs, "dsoAnchorClick" | "dsoClick">>({
          content: story.content,
          inline: false,
          interactive: false,
          deleted: false,
          prefix: story.args?.prefix || "",
          suffix: story.args?.suffix || "",
          ...story.args,
        }),
      });
    });

    return stories;
  });
}
