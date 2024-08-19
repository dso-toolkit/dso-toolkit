import type { Meta } from "@storybook/web-components";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/input-number/readme.md?raw";
import { InputNumberArgs, inputNumberMeta, inputNumberStories } from "dso-toolkit";

const meta: Meta<InputNumberArgs> = {
  ...inputNumberMeta({ readme }),
  title: "HTML|CSS/Input Number (Deprecated)",
};

export default meta;

const { InputNumber } = inputNumberStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { inputNumberTemplate } = templates;

    return {
      inputNumberTemplate,
    };
  },
});

export { InputNumber };
