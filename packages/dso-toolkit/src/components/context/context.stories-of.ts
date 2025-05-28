import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { ContextArgs, contextArgTypes, contextArgsMapper } from "./context.args.js";
import { Context } from "./context.models.js";

type ContextStory = StoryObj<ContextArgs, Renderer>;

interface ContextStories {
  Label: ContextStory;
  Legend: ContextStory;
  LabelAlignLeft: ContextStory;
  LegendAlignLeft: ContextStory;
}

interface ContextStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, ContextTemplates<TemplateFnReturnType>> {}

interface ContextTemplates<TemplateFnReturnType> {
  contextTemplate: (contextProperties: Context<TemplateFnReturnType>) => TemplateFnReturnType;
  children: TemplateFnReturnType;
  content: TemplateFnReturnType;
  label: TemplateFnReturnType;
}

export function contextMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ContextArgs
> {
  return {
    argTypes: contextArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function contextStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ContextStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ContextStories {
  return {
    Label: {
      args: {
        type: "label",
      },
      render: templateContainer.render(storyTemplates, (args, { contextTemplate, children, content, label }) =>
        contextTemplate(contextArgsMapper(args, content, children, label)),
      ),
    },
    Legend: {
      args: {
        type: "legend",
      },
      render: templateContainer.render(storyTemplates, (args, { contextTemplate, children, content, label }) =>
        contextTemplate(contextArgsMapper(args, content, children, label)),
      ),
    },
    LabelAlignLeft: {
      args: {
        type: "label",
        alignLeft: true,
      },
      render: templateContainer.render(storyTemplates, (args, { contextTemplate, children, content, label }) =>
        contextTemplate(contextArgsMapper(args, content, children, label)),
      ),
    },
    LegendAlignLeft: {
      args: {
        type: "legend",
        alignLeft: true,
      },
      render: templateContainer.render(storyTemplates, (args, { contextTemplate, children, content, label }) =>
        contextTemplate(contextArgsMapper(args, content, children, label)),
      ),
    },
  };
}
