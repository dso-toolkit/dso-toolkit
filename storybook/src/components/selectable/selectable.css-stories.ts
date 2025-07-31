import type { Meta } from "@storybook/web-components";
import { SelectableArgs, selectableMeta, selectableStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/selectable/readme.md?raw";

import { templateContainer } from "../../templates";

import { infoRichContent } from "./selectable.content";

const meta: Meta<SelectableArgs<unknown>> = {
  ...selectableMeta({ readme }),
  title: "HTML|CSS/Selectable (Deprecated)",
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

export { Checkbox, Nested, Radio, WithInfo };
