import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { RichContentArgs, richContentArgsMapper, richContentArgTypes } from "./rich-content.args.js";
import { RichContent } from "./rich-content.models.js";

export interface RichContentTemplates<TemplateFnReturnType> {
  richContentTemplate: (richContentProperties: RichContent<TemplateFnReturnType>) => TemplateFnReturnType;
  children: TemplateFnReturnType;
}

export function storiesOfRichContent<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    RichContentTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Rich Content", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: richContentArgTypes,
    });

    const template = templateMapper<RichContentArgs<TemplateFnReturnType>>((args, { richContentTemplate, children }) =>
      richContentTemplate(richContentArgsMapper(args, children))
    );

    stories.add("Rich Content", template);

    return stories;
  });
}
