import type { Meta } from "@storybook/web-components-vite";
import { Button, IconButton, InfoButton } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import "./button-on-color.scss";

import { examplePageStories } from "../../example-page-stories";
import { Templates } from "../../templates";

const meta: Meta = {
  title: "Patronen/Button on color",
};

export default meta;

export const ButtonOnColor = examplePageStories((templates) => {
  return html`
    <div class="button-container-demo">${allButtons(templates)}</div>
    <div class="button-container-demo background-dark-demo">${allButtons(templates)}</div>
    <div class="button-container-demo background-light-demo">${allButtons(templates)}</div>
  `;
});

const allButtons = (templates: Templates) => {
  const { buttonTemplate, iconButtonTemplate, infoButtonTemplate } = templates;

  return html`
    ${renderSection("Primary buttons", primaryButtons, buttonTemplate)}
    ${renderSection("Secondary buttons", secondaryButtons, buttonTemplate)}
    ${renderSection("Tertiary buttons", tertiaryButtons, buttonTemplate)}
    ${renderSection("Secondary Icon Buttons", secondaryIconButtons, iconButtonTemplate)}
    ${renderSection("Tertiary Icon Buttons", tertiaryIconButtons, iconButtonTemplate)}
    ${renderSection("Info buttons", infoButtons, infoButtonTemplate)}
  `;
};

const renderSection = <T>(title: string, items: T[], template: (item: T) => TemplateResult) => html`
  <section class="button-section">
    <h2>${title}</h2>
    <div class="button-group">${items.map((item) => template(item))}</div>
  </section>
`;

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

const infoButtons: InfoButton<TemplateResult>[] = [
  { label: "Default active", active: true },
  { label: "Information", children: html`Dit is content in de tooltip` },
];
