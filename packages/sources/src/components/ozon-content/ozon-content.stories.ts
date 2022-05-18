import { bindTemplate, StorybookParameters } from "../../stories-helpers";

import {
  ozonContentArgTypes,
  ozonContentArgsMapper,
} from "./ozon-content.args";
import { content } from "./ozon-content.content";
import { OzonContent } from "./ozon-content.models";

export interface OzonContentParameters<TemplateFnReturnType> {
  ozonContentTemplate: (
    ozonContentProperties: OzonContent
  ) => TemplateFnReturnType;
}

export function storiesOfOzonContent<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { ozonContentTemplate }: OzonContentParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(ozonContentArgsMapper, ozonContentTemplate);

  const stories = storiesOf("Ozon Content", mainModule).addParameters({
    docs: {
      page: readme,
    },
    argTypes: ozonContentArgTypes,
  });

  content.forEach((story) => {
    stories.add(story.title, template, {
      args: {
        content: story.content,
        inline: false,
        ...story.args
      },
    });
  });
}
