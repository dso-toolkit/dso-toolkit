import { ComponentAnnotations, Renderer } from "@storybook/types";

import { ListButtonArgs, listButtonArgsMapper, listButtonArgTypes, listButtonDefaultArgs } from "./list-button.args.js";
import { ListButton } from "./list-button.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

type ListButtonStory = StoryObj<ListButtonArgs, Renderer>;

interface ListButtonStories {
  SingleSelect: ListButtonStory;
  MultiSelect: ListButtonStory;
  CssLegacyReadonlyCount: ListButtonStory;
}

export interface ListButtonTemplates<TemplateFnReturnType> {
  listButtonTemplate: (listButtonProperties: ListButton) => TemplateFnReturnType;
}

export function listButtonMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ListButtonArgs
> {
  return {
    argTypes: listButtonArgTypes,
    args: {
      label: "Milieubelastende activiteit - Melding",
      minusButtonInactive: true,
      plusButtonInactive: true,
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

interface ListButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ListButtonTemplates<TemplateFnReturnType>
  > {}

export function listButtonStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ListButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ListButtonStories {
  const render = templateContainer.render(storyTemplates, (args: ListButtonArgs, { listButtonTemplate }) =>
    listButtonTemplate(listButtonArgsMapper(args)),
  );
  return {
    SingleSelect: {
      render,
    },
    MultiSelect: {
      args: listButtonDefaultArgs({
        hasInputNumber: true,
        count: 5,
        min: 0,
        max: 99,
      }),
      render,
    },
    CssLegacyReadonlyCount: {
      args: listButtonDefaultArgs({
        count: 5,
      }),
      render,
    },
  };
}
