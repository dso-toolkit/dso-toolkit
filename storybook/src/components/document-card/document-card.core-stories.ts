import type { Meta } from "@storybook/web-components";
import { DocumentCardArgs, documentCardMeta, documentCardStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/document-card/readme.md?raw";
import { type, typeAuthority } from "./document-card.content";

const meta: Meta<DocumentCardArgs> = {
  ...documentCardMeta({ readme }),
  title: "Core/Document Card",
};

export default meta;

const { Default, WithLabel, WithTypeToeliching } = documentCardStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { documentCardTemplate } = templates;

    return {
      documentCardTemplate,
      typeAuthority,
      type,
    };
  },
});

export { Default, WithLabel, WithTypeToeliching };
