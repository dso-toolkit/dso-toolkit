import { ComponentAnnotations, Renderer } from "@storybook/types";

import { IconArgs, iconArgsMapper, iconArgTypes } from "./icon.args.js";
import { Icon } from "./icon.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

interface IconStories {
  Icon: StoryObj<IconArgs, Renderer>;
}

export interface IconTemplates<TemplateFnReturnType> {
  iconTemplate: (iconProperties: Icon) => TemplateFnReturnType;
}

interface IconStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, IconTemplates<TemplateFnReturnType>> {}

export function iconMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  IconArgs
> {
  return {
    argTypes: iconArgTypes,
    args: {
      icon: "user",
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function iconStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: IconStoriesParameters<Implementation, Templates, TemplateFnReturnType>): IconStories {
  return {
    Icon: {
      render: templateContainer.render(storyTemplates, (args, { iconTemplate }) => iconTemplate(iconArgsMapper(args))),
    },
  };
}
