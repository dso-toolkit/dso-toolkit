import readme from "@dso-toolkit/core/src/components/survey-rating/readme.md?raw";
import { SurveyRatingArgs, surveyRatingMeta, surveyRatingStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import type { Meta } from "@storybook/web-components";

const meta: Meta<SurveyRatingArgs> = {
  ...surveyRatingMeta({ readme }),
  title: "Core/Survey Rating",
};

export default meta;

const { Default } = surveyRatingStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { surveyRatingTemplate } = templates;

    return {
      surveyRatingTemplate,
    };
  },
});

export { Default };
