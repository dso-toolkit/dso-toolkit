import type { Meta } from "@storybook/web-components";
import { SelectableArgs, selectableMeta, selectableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/selectable/readme.md?raw";
import { infoRichContent } from "./selectable.content";

const meta: Meta<SelectableArgs<unknown>> = {
  ...selectableMeta({ readme }),
  title: "HTML|CSS/Selectable",
};

export default meta;

const { Radio, Checkbox, WithInfo, Nested } = selectableStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { selectableTemplate } = templates;

    return {
      selectableTemplate,
      infoRichContent: infoRichContent(templates),
    };
  },
});

export { Radio, Checkbox, WithInfo, Nested };
