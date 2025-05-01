import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";

import { OnboardingTipArgs, onboardingTipArgsMapper, onboardingTipArgTypes } from "./onboarding-tip.args";
import { OnboardingTip } from "./onboarding-tip.models";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { v4 as uuidv4 } from "uuid";

export type OnboardingTipDecorator<TemplateFnReturnType> = (
  story: PartialStoryFn,
  args: OnboardingTipArgs,
) => TemplateFnReturnType;

interface OnboardingTipStories {
  Default: StoryObj<OnboardingTipArgs, Renderer>;
}

interface OnboardingTipStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    OnboardingTipTemplates<TemplateFnReturnType>
  > {}

interface OnboardingTipTemplates<TemplateFnReturnType> {
  onboardingTipTemplate: (onboardingTipProperties: OnboardingTip<TemplateFnReturnType>) => TemplateFnReturnType;
  richContent: TemplateFnReturnType;
  headingContent: TemplateFnReturnType;
}

export function onboardingTipMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  OnboardingTipArgs
> {
  return {
    argTypes: onboardingTipArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function onboardingTipStories<Implementation, Templates, TemplateFnReturnType>(
  {
    storyTemplates,
    templateContainer,
  }: OnboardingTipStoriesParameters<Implementation, Templates, TemplateFnReturnType>,
  decorator: OnboardingTipDecorator<TemplateFnReturnType>,
): OnboardingTipStories {
  return {
    Default: {
      args: {
        id: uuidv4(),
        placement: "right",
        box: 5,
      },
      decorators: [(story, context) => decorator(story, context.args)],
      render: templateContainer.render(storyTemplates, (args, { onboardingTipTemplate, headingContent, richContent }) =>
        onboardingTipTemplate(onboardingTipArgsMapper(args, headingContent, richContent)),
      ),
    },
  };
}
