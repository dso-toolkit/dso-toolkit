import type { Meta } from "@storybook/web-components-vite";
import { Button, IconButton } from "dso-toolkit";
import { html } from "lit-html";
import "./button-on-color.scss";

import { examplePageStories } from "../../example-page-stories";
import { Templates } from "../../templates";

const meta: Meta = {
  title: "Patronen/Button on color",
};

export default meta;

export const ButtonOnColor = examplePageStories((templates) => {
  return html`
    <div class="button-container">${allButtons(templates)}</div>

    <div class="button-container background-light">${allButtons(templates)}</div>

    <div class="button-container background-dark">${allButtons(templates)}</div>
  `;
});

const allButtons = (templates: Templates) => {
  const { buttonTemplate, iconButtonTemplate } = templates;
  return html` <div>
      <p>Primary buttons</p>
      <div>${primaryButtons.map((button) => html`${buttonTemplate(button)}`)}</div>
    </div>
    <div>
      <p>Secondary buttons</p>
      <div>${secondaryButtons.map((button) => html`${buttonTemplate(button)}`)}</div>
    </div>
    <div>
      <p>Tertiary buttons</p>
      <div>${tertiaryButtons.map((button) => html`${buttonTemplate(button)}`)}</div>
    </div>
    <div>
      <p>Secondary Icon Buttons</p>
      <div>${secondaryIconButtons.map((iconButton) => html`${iconButtonTemplate(iconButton)}`)}</div>
    </div>
    <div>
      <p>Tertiary Icon Buttons</p>
      <div>${tertiaryIconButtons.map((iconButton) => html`${iconButtonTemplate(iconButton)}`)}</div>
    </div>`;
};

const primaryButtons: Button[] = [
  { label: "Button", variant: "primary", type: "button", icon: { icon: "chevron-right" }, iconMode: "after" },
  {
    label: "Button",
    variant: "primary",
    type: "button",
    icon: { icon: "chevron-right" },
    iconMode: "after",
    disabled: true,
  },
];

const secondaryButtons: Button[] = [
  { label: "Button", variant: "secondary", type: "button", icon: { icon: "chevron-right" }, iconMode: "after" },
  {
    label: "Button",
    variant: "secondary",
    type: "button",
    icon: { icon: "chevron-right" },
    iconMode: "after",
    disabled: true,
  },
];

const tertiaryButtons: Button[] = [
  { label: "Button", variant: "tertiary", type: "button", icon: { icon: "chevron-right" }, iconMode: "after" },
  {
    label: "Button",
    variant: "tertiary",
    type: "button",
    icon: { icon: "chevron-right" },
    iconMode: "after",
    disabled: true,
  },
];

const secondaryIconButtons: IconButton[] = [
  { label: "Button", variant: "secondary", icon: "chevron-right" },
  { label: "Button", variant: "secondary", icon: "chevron-right", disabled: true },
];

const tertiaryIconButtons: IconButton[] = [
  { label: "Button", variant: "tertiary", icon: "chevron-right" },
  { label: "Button", variant: "tertiary", icon: "chevron-right", disabled: true },
];
