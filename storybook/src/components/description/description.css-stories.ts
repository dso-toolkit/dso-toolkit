import { Meta } from "@storybook/web-components-vite";
import { descriptionMeta, descriptionStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/description/readme.md?raw";
import { html } from "lit-html";

import { templateContainer } from "../../templates";

const meta: Meta = {
  ...descriptionMeta({ readme }),
  title: "HTML|CSS/Description",
};

export default meta;

const { Term, Example } = descriptionStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { descriptionTemplate } = templates;

    return {
      descriptionTemplate,
      exampleTemplate: (exampleData) =>
        html`${exampleData.map((d) => (typeof d === "string" ? d : descriptionTemplate(d)))}`,
    };
  },
});

export { Example, Term };
