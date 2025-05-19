import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { SurveyRatingArgs, surveyRatingArgTypes, surveyRatingArgsMapper } from "./survey-rating.args.js";
import { SurveyRating } from "./survey-rating.models.js";

type SurveyRatingStory = StoryObj<SurveyRatingArgs, Renderer>;

interface SurveyRatingStories {
  Default: SurveyRatingStory;
}

interface SurveyRatingStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    SurveyRatingTemplates<TemplateFnReturnType>
  > {}

interface SurveyRatingTemplates<TemplateFnReturnType> {
  surveyRatingTemplate: (surveyRatingProperties: SurveyRating) => TemplateFnReturnType;
}

export function surveyRatingMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  SurveyRatingArgs
> {
  return {
    argTypes: surveyRatingArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function surveyRatingStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: SurveyRatingStoriesParameters<Implementation, Templates, TemplateFnReturnType>): SurveyRatingStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { surveyRatingTemplate }) =>
        surveyRatingTemplate(surveyRatingArgsMapper(args)),
      ),
    },
  };
}
