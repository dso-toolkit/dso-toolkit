import { Meta } from "@storybook/web-components";

import { formButtonsMeta, formButtonsStories } from "dso-toolkit";

import readme from "dso-toolkit/src/components/form-buttons/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta = {
  ...formButtonsMeta({ readme }),
  title: "HTML|CSS/Form Buttons",
};

export default meta;

const { Default, MultiPage, Sections, SinglePage, SimpelForm } = formButtonsStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { formButtonsTemplate } = templates;

    return {
      formButtonsTemplate,
    };
  },
});

export { Default, MultiPage, Sections, SinglePage, SimpelForm };
