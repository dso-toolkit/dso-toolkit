import { Meta } from "@storybook/web-components";

import { FormArgs, formMeta, formStories } from "dso-toolkit";

import readme from "dso-toolkit/src/components/form/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<FormArgs> = {
  ...formMeta({ readme }),
  title: "HTML|CSS/Form",
};

export default meta;

const { Horizontal, HorizontalCollections, Vertical, VerticalCollections } = formStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { formTemplate } = templates;

    return {
      formTemplate,
    };
  },
});

export { Horizontal, HorizontalCollections, Vertical, VerticalCollections };
