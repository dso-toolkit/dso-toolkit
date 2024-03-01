import type { Meta } from "@storybook/web-components";
import { InputRangeArgs, inputRangeMeta, inputRangeStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/input-range/readme.md?raw";

const meta: Meta<InputRangeArgs> = {
  ...inputRangeMeta({ readme }),
  title: "Core/Input Range",
};

export default meta;

const { Default } = inputRangeStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { inputRangeTemplate } = templates;

    return {
      inputRangeTemplate,
    };
  },
});

export { Default };
