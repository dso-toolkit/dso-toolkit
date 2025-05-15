import { type Meta, moduleMetadata } from "@storybook/angular";
import { ExpandableArgs, expandableMeta, expandableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { isStoryFnAngularReturnTypeTemplate } from "../helpers";

import readme from "./readme.md?raw";
import { expandableContent } from "./expandable.content";
import { DsoExpandable } from "../../projects/component-library/src/public-api";

const meta: Meta<ExpandableArgs> = {
  ...expandableMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoExpandable],
    }),
  ],
  title: "Expandable",
};

export default meta;

const { Default, WithAnimation } = expandableStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { expandableTemplate } = templates;

    return {
      expandableTemplate,
      expandableContent,
    };
  },
  decorator: (story) => {
    const s = story();
    if (!isStoryFnAngularReturnTypeTemplate(s)) {
      throw new Error("Expected a valid Angular template");
    }

    const { props, template } = s;

    return {
      props,
      template: `
      <span>toggle open control in the controls panel to expand/collapse.<span>
      ${template}

      <style>
        dso-expandable[open],
        dso-expandable:not(.dso-hide) {
          border: 1px solid #000;
        }
      </style>
    `,
    };
  },
});

export { Default, WithAnimation };
