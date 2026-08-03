import readme from "@dso-toolkit/core/src/components/selectable/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { SelectableArgs, selectableMeta, selectableStories } from "dso-toolkit";

import { infoRichContent } from "./selectable.content";
import { selectableTemplate } from "./selectable.core-template";

const meta: Meta<SelectableArgs<unknown>> = {
  ...selectableMeta({ readme }),
  title: "Core/Selectable",
};

export default meta;

const { Radio, Checkbox, WithInfo, Nested } = selectableStories({
  storyTemplates: () => {
    return {
      selectableTemplate,
      infoRichContent,
    };
  },
});

export { Checkbox, Nested, Radio, WithInfo };
