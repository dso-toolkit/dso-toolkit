import readme from "@dso-toolkit/core/src/components/plekinfo-card/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { PlekinfoCardArgs, plekinfoCardMeta, plekinfoCardStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import {
  addedItemContent,
  defaultItemContent,
  deletedItemContent,
  labelChangeItemContent,
  sublistContent,
} from "./plekinfo-card-item.content";
import { content, defaultSymbol } from "./plekinfo-card.content";
import { decorator } from "./plekinfo-card.decorator";

const meta: Meta<PlekinfoCardArgs> = {
  ...plekinfoCardMeta({ readme }),
  title: "Core/Plekinfo Card",
};

export default meta;

const {
  Default,
  Added,
  Deleted,
  LabelChange,
  Sublist,
  Static,
  WithoutSymbol,
  WithLabel,
  WithSlideToggle,
  WithNameChange,
  WithNameChangeComplex,
} = plekinfoCardStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { plekinfoCardTemplate } = templates;

    return {
      plekinfoCardTemplate,
      defaultSymbol,
      content,
      defaultItemContent,
      addedItemContent,
      deletedItemContent,
      labelChangeItemContent,
      sublistItemContent: sublistContent,
    };
  },
  decorator,
});

export {
  Added,
  Default,
  Deleted,
  LabelChange,
  Static,
  Sublist,
  WithLabel,
  WithNameChange,
  WithNameChangeComplex,
  WithSlideToggle,
  WithoutSymbol,
};
