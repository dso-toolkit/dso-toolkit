import { type Meta, moduleMetadata } from "@storybook/angular";
import { ToggletipArgs, toggletipMeta, toggletipStories } from "dso-toolkit";

import { DsoToggletip } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { isStoryFnAngularReturnTypeTemplate } from "../helpers";

import readme from "./readme.md?raw";
import { children } from "./toggletip.content";

const meta: Meta<ToggletipArgs> = {
  ...toggletipMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoToggletip],
    }),
  ],
  title: "Toggletip",
};

export default meta;

const { Toggletip } = toggletipStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { toggletipTemplate } = templates;

    return {
      toggletipTemplate,
      children,
    };
  },
  decorator: (story, args) => {
    const side = (args.position || "right") as string;
    const alignItems: Record<string, string> = {
      left: "center",
      right: "center",
      top: "flex-end",
      bottom: "flex-start",
    };
    const justifyContent: Record<string, string> = {
      left: "flex-end",
      right: "flex-start",
      top: "center",
      bottom: "center",
    };

    const s = story();
    if (!isStoryFnAngularReturnTypeTemplate(s)) {
      throw new Error("Expected a valid Angular template");
    }

    const { props, template } = s;

    return {
      props,
      template: `
      <div class="toggletip-decorator">${template}</div>

    <style>
      .toggletip-decorator {
        display: flex;
        align-items: ${alignItems[side]};
        justify-content: ${justifyContent[side]};
        height: calc(100vh - 40px);
        width: 100%;
      }
    </style>
      `,
    };
  },
});

export { Toggletip };
