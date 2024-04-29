import { Meta } from "@storybook/web-components";
import { DescriptionArgs, descriptionMeta, descriptionStories } from "dso-toolkit";

import readme from "dso-toolkit/src/components/description/readme.md?raw";
import { templateContainer } from "../../templates";
import { html } from "lit-html";

const meta: Meta<DescriptionArgs> = {
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

export { Term, Example };
