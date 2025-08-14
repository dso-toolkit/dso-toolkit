import type { Meta } from "@storybook/react-vite";
import { SelectableArgs, selectableMeta, selectableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { infoRichContent } from "./selectable.content";

const meta: Meta<SelectableArgs<unknown>> = {
  ...selectableMeta({ readme }),
  title: "Selectable",
};

export default meta;

const { Radio, Checkbox, WithInfo, Nested } = selectableStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { selectableTemplate } = templates;

    return {
      selectableTemplate,
      infoRichContent,
    };
  },
});

export { Checkbox, Nested, Radio, WithInfo };
