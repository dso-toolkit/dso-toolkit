import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import {
  SlideToggleArgs,
  slideToggleArgTypes,
  slideToggleArgsMapper,
  slideToggleDefaultArgs,
} from "./slide-toggle.args.js";
import { SlideToggle } from "./slide-toggle.models.js";

type SlideToggleStory = StoryObj<SlideToggleArgs, Renderer>;

interface SlideToggleStories {
  Default: SlideToggleStory;
  Disabled: SlideToggleStory;
  ZichtbaarLabel: SlideToggleStory;
  LabelledById: SlideToggleStory;
}

interface SlideToggleStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  SlideToggleTemplates<TemplateFnReturnType>
> {}

interface SlideToggleTemplates<TemplateFnReturnType> {
  slideToggleTemplate: (slideToggleProperties: SlideToggle) => TemplateFnReturnType;
}

export function slideToggleMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  SlideToggleArgs
> {
  return {
    argTypes: slideToggleArgTypes,
    args: {
      dsoActiveChange: fn(),
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

export function slideToggleStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: SlideToggleStoriesParameters<Implementation, Templates, TemplateFnReturnType>): SlideToggleStories {
  return {
    Default: {
      args: slideToggleDefaultArgs({
        checked: false,
        accessibleLabel: "sr-only label van het schuifje",
      }),
      render: templateContainer.render(storyTemplates, (args, { slideToggleTemplate }) =>
        slideToggleTemplate(slideToggleArgsMapper(args)),
      ),
    },
    Disabled: {
      args: slideToggleDefaultArgs({
        checked: false,
        disabled: true,
      }),
      render: templateContainer.render(storyTemplates, (args, { slideToggleTemplate }) =>
        slideToggleTemplate(slideToggleArgsMapper(args)),
      ),
    },
    ZichtbaarLabel: {
      args: slideToggleDefaultArgs({
        checked: false,
        useOwnLabelId: uuidv4(),
      }),
      render: templateContainer.render(storyTemplates, (args, { slideToggleTemplate }) =>
        slideToggleTemplate(slideToggleArgsMapper(args)),
      ),
    },
    LabelledById: {
      args: slideToggleDefaultArgs({
        checked: false,
        labelledbyId: uuidv4(),
      }),
      render: templateContainer.render(storyTemplates, (args, { slideToggleTemplate }) =>
        slideToggleTemplate(slideToggleArgsMapper(args)),
      ),
    },
  };
}
