import { componentArgs } from "../../storybook";
import { storiesOfFactory } from "../../storybook/stories-of-factory";

import {
  ozonContentArgTypes,
  ozonContentArgsMapper,
  OzonContentArgs,
} from "./ozon-content.args";
import { content } from "./ozon-content.content";
import { OzonContent } from "./ozon-content.models";

export interface OzonContentTemplates<TemplateFnReturnType> {
  ozonContentTemplate: (
    ozonContentProperties: OzonContent
  ) => TemplateFnReturnType;
}

export const storiesOfOzonContent = storiesOfFactory<OzonContentTemplates<any>, OzonContentArgs>('Ozon Content', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: ozonContentArgTypes
  });

  const template = templateMapper((args, { ozonContentTemplate }) => ozonContentTemplate(ozonContentArgsMapper(args)));

  content.forEach((story) => {
    stories.add(story.title, template, {
      args: componentArgs<Omit<OzonContentArgs, 'dsoAnchorClick' | 'dsoClick'>>({
        content: story.content,
        inline: false,
        interactive: false,
        deleted: false,
        prefix: story.args?.prefix || '',
        suffix: story.args?.suffix || '',
        ...story.args
      }),
    });
  });
});
