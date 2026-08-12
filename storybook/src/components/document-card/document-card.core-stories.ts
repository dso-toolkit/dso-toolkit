import readme from "@dso-toolkit/core/src/components/document-card/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { DocumentCardArgs, documentCardMeta, documentCardStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { characteristicsItems, infoButton, typeItems } from "./document-card.content";

const meta: Meta<DocumentCardArgs<unknown>> = {
  ...documentCardMeta({ readme }),
  title: "Core/Document Card",
};

export default meta;

const { Default, WithCharacteristics, WithLabel, WithTypeToelichting, WithStatusToelichting } = documentCardStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { documentCardTemplate } = templates;

    return {
      documentCardTemplate,
      typeItems,
      infoButton: infoButton(templates),
      characteristicsItems,
    };
  },
});

export { Default, WithCharacteristics, WithLabel, WithStatusToelichting, WithTypeToelichting };
