import { type Meta, moduleMetadata } from "@storybook/angular";
import { ExpandableArgs, expandableMeta, expandableStories } from "dso-toolkit";

import { DsoExpandable } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import { expandableContent } from "./expandable.content";
import readme from "./readme.md?raw";

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
    return {
      props: s.props,
      template: `<span>Toggle open control in the controls panel to expand/collapse.</span>
      ${s.template}
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
