import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import {
  SegmentedButtonArgs,
  segmentedButtonArgTypes,
  segmentedButtonArgs,
  segmentedButtonArgsMapper,
} from "./segmented-button.args.js";
import { SegmentedButton } from "./segmented-button.models.js";

type SegmentedButtonStory = StoryObj<SegmentedButtonArgs, Renderer>;

interface SegmentedButtonStories {
  Default: SegmentedButtonStory;
  WithDisabledButton: SegmentedButtonStory;
}

interface SegmentedButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  SegmentedButtonTemplates<TemplateFnReturnType>
> {}

interface SegmentedButtonTemplates<TemplateFnReturnType> {
  segmentedButtonTemplate: (segmentedButtonProperties: SegmentedButton) => TemplateFnReturnType;
}

export function segmentedButtonMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  SegmentedButtonArgs
> {
  return {
    argTypes: segmentedButtonArgTypes,
    args: {
      ...segmentedButtonArgs,
      dsoChange: fn(),
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

export function segmentedButtonStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: SegmentedButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>): SegmentedButtonStories {
  const render = templateContainer.render(storyTemplates, (args: SegmentedButtonArgs, { segmentedButtonTemplate }) =>
    segmentedButtonTemplate(segmentedButtonArgsMapper(args)),
  );
  return {
    Default: {
      args: {
        options: [
          { label: "Button 1", disabled: false },
          { label: "Button 2", disabled: false },
          { label: "Button 3", disabled: false },
          { label: "Button 4", disabled: false },
        ],
        activeOption: -1,
      },
      render,
    },
    WithDisabledButton: {
      args: {
        options: [
          { label: "Button 1", disabled: false },
          { label: "Button 2", disabled: false },
          { label: "Button 3", disabled: true },
          { label: "Button 4", disabled: true },
        ],
        activeOption: -1,
      },
      render,
    },
  };
}
