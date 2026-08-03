import readme from "@dso-toolkit/core/src/components/icon/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import icons from "../../../assets/icons.json";
import { StoryObj } from "../../shared/story-obj.js";

import { IconArgs, iconArgTypes, iconArgsMapper } from "./icon.args.js";
import { iconTemplate } from "./icon.template.js";

type IconStory = StoryObj<IconArgs, Renderer>;

const meta: Meta<IconArgs> = {
  title: "Core/Icon",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: IconStory = {
  argTypes: iconArgTypes(icons),
  args: {
    icon: "user-solid",
  },
  render: (args) => iconTemplate(iconArgsMapper(args)),
};

export const Overview: IconStory = {
  render: () => html`
    <ul id="icon-overview-list" class="icon-overview-list">
      ${icons.map(
        (icon) =>
          html`<li>
            ${iconTemplate({ icon: icon as IconArgs["icon"] })}
            <br /><code>${icon}</code>
          </li>`,
      )}
    </ul>

    <style>
      .icon-overview-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        list-style: none;
        padding: 0;
        margin: 16px 48px;
        gap: 4px;
      }

      li {
        text-align: center;
        padding: 16px;
        background-color: #efefef;
      }

      dso-icon {
        margin-block-end: 16px;
      }
    </style>
  `,
};
