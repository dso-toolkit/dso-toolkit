import type { Meta } from "@storybook/web-components";
import { PlekinfoCardArgs, plekinfoCardMeta, plekinfoCardStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import readme from "@dso-toolkit/core/src/components/plekinfo-card/readme.md?raw";
import { content, defaultSymbol } from "./plekinfo-card.content";
import { decorator } from "./plekinfo-card.decorator";

const meta: Meta<PlekinfoCardArgs> = {
  ...plekinfoCardMeta({ readme }),
  title: "Core/Plekinfo Card",
};

export default meta;

const { Default, WithoutSymbol, WithLabel, WithNameChange, WithNameChangeComplex } = plekinfoCardStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { plekinfoCardTemplate } = templates;

    return {
      plekinfoCardTemplate,
      defaultSymbol,
      content,
    };
  },
  decorator,
});

export { Default, WithoutSymbol, WithLabel, WithNameChange, WithNameChangeComplex };
