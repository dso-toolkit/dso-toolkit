import readme from "@dso-toolkit/core/src/components/survey-rating/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { SurveyRatingArgs, surveyRatingMeta, surveyRatingStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

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
