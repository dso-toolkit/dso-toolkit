import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { JustifyFormGroups } from "./justify-form-groups.models.js";

interface JustifyFormGroupsStories {
  JustifyFormGroups: StoryObj<Record<string, never>, Renderer>;
}

export interface JustifyFormGroupsStoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  JustifyFormGroupsTemplates<TemplateFnReturnType>
> {}

export interface JustifyFormGroupsTemplates<TemplateFnReturnType> {
  justifyFormGroupsTemplate: (
    justifyFormGroupsProperties: JustifyFormGroups<TemplateFnReturnType>,
  ) => TemplateFnReturnType;
  content: JustifyFormGroups<TemplateFnReturnType>;
}

export function justifyFormGroupsMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}
export function justifyFormGroupsStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: JustifyFormGroupsStoriesParameters<Implementation, Templates, TemplateFnReturnType>): JustifyFormGroupsStories {
  return {
    JustifyFormGroups: {
      render: templateContainer.render(storyTemplates, (_args, { justifyFormGroupsTemplate, content }) =>
        justifyFormGroupsTemplate(content),
      ),
    },
  };
}
