import type { Meta } from "@storybook/angular";
import { ScrollableArgs, scrollableMeta, scrollableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { isStoryFnAngularReturnTypeTemplate } from "../helpers";

import readme from "./readme.md?raw";
import { defaultContent, dynamicContent } from "./scrollable.content";
import { DsoScrollable } from "../../projects/component-library/src/public-api";

const meta: Meta<ScrollableArgs> = {
  ...scrollableMeta({ readme }),
  component: DsoScrollable,
  title: "Scrollable",
};

export default meta;

const { Default, DynamicContent } = scrollableStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { scrollableTemplate } = templates;

    return {
      scrollableTemplate,
      defaultContent,
      dynamicContent,
    };
  },
  decorator: (story) => {
    const s = story();
    if (!isStoryFnAngularReturnTypeTemplate(s)) {
      throw new Error("Expected a valid Angular template");
    }

    return {
      template: `<div id="scrollable-mock" style="background-color: #efefef; height: 750px; max-width: 500px">${s.template}</div>`,
    };
  },
});

export { Default, DynamicContent };
