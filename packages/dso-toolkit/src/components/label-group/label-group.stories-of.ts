import { ComponentAnnotations, Renderer } from "@storybook/types";

import { labelGroupArgsMapper } from "./label-group.args.js";
import { LabelGroup } from "./label-group.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { MetaOptions } from "../../storybook/meta-options.interface";

import { compiler } from "markdown-to-jsx";

interface LabelGroupStories {
  LabelGroup: StoryObj<Record<string, never>, Renderer>;
}

export interface LabelGroupTemplates<TemplateFnReturnType> {
  labelGroupTemplate: (labelGroupProperties: LabelGroup) => TemplateFnReturnType;
}

interface LabelGroupStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    LabelGroupTemplates<TemplateFnReturnType>
  > {}

export function labelGroupMeta<TRenderer extends Renderer>({
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

export function labelGroupStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: LabelGroupStoriesParameters<Implementation, Templates, TemplateFnReturnType>): LabelGroupStories {
  return {
    LabelGroup: {
      render: templateContainer.render(storyTemplates, (_args, { labelGroupTemplate }) =>
        labelGroupTemplate(labelGroupArgsMapper()),
      ),
    },
  };
}
