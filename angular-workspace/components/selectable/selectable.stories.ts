import { type Meta, moduleMetadata } from "@storybook/angular";
import { SelectableArgs, selectableMeta, selectableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import readme from "./readme.md?raw";
import { infoRichContent } from "./selectable.content";
import { DsoSelectable } from "../../projects/component-library/src/public-api";

const meta: Meta<SelectableArgs<unknown>> = {
  ...selectableMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoSelectable],
    }),
  ],
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

export { Radio, Checkbox, WithInfo, Nested };
