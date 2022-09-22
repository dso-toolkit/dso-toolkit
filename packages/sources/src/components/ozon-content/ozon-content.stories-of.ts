import { bindTemplate, componentArgs, createStories, StorybookParameters } from "../../storybook";

import {
  ozonContentArgTypes,
  ozonContentArgsMapper,
  OzonContentArgs,
} from "./ozon-content.args";
import { content } from "./ozon-content.content";
import { OzonContent } from "./ozon-content.models";

export interface OzonContentParameters<TemplateFnReturnType> {
  ozonContentTemplate: (
    ozonContentProperties: OzonContent
  ) => TemplateFnReturnType;
}

export function storiesOfOzonContent<TemplateFnReturnType>(
  parameters: StorybookParameters,
  { ozonContentTemplate }: OzonContentParameters<TemplateFnReturnType>
) {
  const stories = createStories('Ozon Content', parameters, ozonContentArgTypes);
  const template = bindTemplate(ozonContentArgsMapper, ozonContentTemplate);

  content.forEach((story) => {
    stories.add(story.title, template, {
      args: componentArgs<Omit<OzonContentArgs, 'onDsoAnchorClick' | 'onDsoClick'>>({
        content: story.content,
        inline: false,
        interactive: false,
        deleted: false,
        ...story.args
      }),
    });
  });
}
