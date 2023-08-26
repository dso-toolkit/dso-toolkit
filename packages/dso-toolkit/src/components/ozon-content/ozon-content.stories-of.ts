import { StoriesOfArguments, storiesOfFactory, componentArgs } from "../../storybook/index.js";

import { ozonContentArgTypes, ozonContentArgsMapper, OzonContentArgs } from "./ozon-content.args.js";
import { content } from "./ozon-content.content.js";
import { OzonContent } from "./ozon-content.models.js";

export interface OzonContentTemplates<TemplateFnReturnType> {
  ozonContentTemplate: (ozonContentProperties: OzonContent) => TemplateFnReturnType;
}

export function storiesOfOzonContent<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    OzonContentTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Ozon Content", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: ozonContentArgTypes,
    });

    const template = templateMapper<OzonContentArgs>((args, { ozonContentTemplate }) =>
      ozonContentTemplate(ozonContentArgsMapper(args))
    );

    content.forEach((story) => {
      stories.add(story.title, template, {
        args: componentArgs<Omit<OzonContentArgs, "dsoAnchorClick" | "dsoClick">>({
          content: story.content,
          inline: false,
          ...story.args,
        }),
      });
    });

    return stories;
  });
}
