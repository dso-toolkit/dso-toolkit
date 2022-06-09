import { bindTemplate, componentArgs, StorybookParameters } from "../../stories-helpers";

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
      args: componentArgs<Omit<OzonContentArgs, 'onAnchorClick' | 'onClick'>>({
        content: story.content,
        inline: false,
        interactive: false,
        deleted: false,
        ...story.args
      }),
    });
  });
}
