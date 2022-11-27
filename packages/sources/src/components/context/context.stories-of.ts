import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { ContextArgs, contextArgsMapper, contextArgTypes } from "./context.args";
import { Context } from "./context.models";

export interface ContextTemplates<TemplateFnReturnType> {
  contextTemplate: (contextProperties: Context<TemplateFnReturnType>) => TemplateFnReturnType;
  children: TemplateFnReturnType;
  content: TemplateFnReturnType;
  label: TemplateFnReturnType;
}

export function storiesOfContext<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ContextTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Context", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: contextArgTypes,
    });

    const template = templateMapper<ContextArgs>((args, { contextTemplate, children, content, label }) =>
      contextTemplate(contextArgsMapper(args, content, children, label))
    );

    stories.add("Label", template, {
      args: {
        type: "label",
      },
    });

    stories.add("Legend", template, {
      args: {
        type: "legend",
      },
    });

    return stories;
  });
}
