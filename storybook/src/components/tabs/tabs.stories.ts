import { Meta, StoryObj } from "@storybook/web-components-vite";
import { fn } from "storybook/test";

import { TabsArgs, tabsArgTypes, tabsArgsMapper } from "./tabs.args.js";
import { tabsTemplate } from "./tabs.template.js";

type TabsStory = StoryObj<TabsArgs>;

const meta: Meta<TabsArgs> = {
  title: "Core/Tabs",
  tags: ["!autodocs"],
  argTypes: tabsArgTypes,
  args: {
    dsoTabSwitch: fn(),
  },
  render: (args) => tabsTemplate(tabsArgsMapper(args)),
};

export default meta;

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
};
