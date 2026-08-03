import componentsReadme from "@dso-toolkit/core/src/components/tabs/components/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/tabs/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import type { TemplateResult } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { TabsArgs, tabsArgTypes, tabsArgsMapper } from "./tabs.args.js";
import { tabsTemplate } from "./tabs.template.js";

type TabsStory = StoryObj<TabsArgs<TemplateResult>, Renderer>;

const meta: Meta<TabsArgs<TemplateResult>> = {
  title: "Core/Tabs",
  argTypes: tabsArgTypes,
  args: {
    dsoTabSwitch: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(`${readme}\n${componentsReadme}`),
    },
  },
};

export default meta;

const render = (args: TabsArgs<TemplateResult>) => tabsTemplate(tabsArgsMapper(args));

export const AsAnchors: TabsStory = {
  args: {
    items: [
      {
        label: "Zoek op adres",
        modifier: "active",
        href: "/adres",
      },
      {
        label: "Postcode en huisnummer",
        href: "/postcode",
      },
      {
        label: "Kadastraal nummer",
        href: "/kadastraal",
      },
      {
        label: "Coördinaten",
        href: "/coordinaten",
      },
    ],
    content: "Inhoud Zoek op adres",
  },
  render,
};

export const AsAnchorsDisabled: TabsStory = {
  args: {
    items: [
      {
        label: "Zoek op adres",
        href: "/adres",
      },
      {
        label: "Postcode en huisnummer",
        href: "/postcode",
        modifier: "active",
      },
      {
        label: "Kadastraal nummer",
        href: "/kadastraal",
      },
      {
        label: "Coördinaten",
        href: "/coordinaten",
        modifier: "disabled",
      },
    ],
    content: "Inhoud Postcode en huisnummer",
  },
  render,
};

export const AsButtons: TabsStory = {
  args: {
    items: [
      {
        label: "Zoek op adres",
      },
      {
        label: "Postcode en huisnummer",
      },
      {
        label: "Kadastraal nummer",
        modifier: "active",
      },
      {
        label: "Coördinaten",
      },
    ],
    content: "Inhoud Kadastraal nummer",
  },
  render,
};

export const AsButtonsDisabled: TabsStory = {
  args: {
    items: [
      {
        label: "Zoek op adres",
        modifier: "disabled",
      },
      {
        label: "Postcode en huisnummer",
      },
      {
        label: "Kadastraal nummer",
        modifier: "disabled",
      },
      {
        label: "Coördinaten",
        modifier: "active",
      },
    ],
    content: "Inhoud Coördinaten",
  },
  render,
};
