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
    ${renderSection("Map Icon Buttons", mapIconButtons, iconButtonTemplate)}
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
  { label: "Secondary Icon Button", variant: "secondary", icon: "chevron-right" },
  { label: "Secondary Icon Button (Toggled)", variant: "secondary", icon: "chevron-right", toggled: true },
  { label: "Secondary Icon Button (Disabled)", variant: "secondary", icon: "chevron-right", disabled: true },
];

const tertiaryIconButtons: IconButton[] = [
  { label: "Tertiary Icon Button", variant: "tertiary", icon: "chevron-right" },
  { label: "Tertiary Icon Button (Toggled)", variant: "tertiary", icon: "chevron-right", toggled: true },
  { label: "Tertiary Icon Button (Disabled)", variant: "tertiary", icon: "chevron-right", disabled: true },
];

const mapIconButtons: IconButton[] = [
  { label: "Map Icon Button", variant: "map", icon: "chevron-right" },
  { label: "Map Icon Button (Toggled)", variant: "map", icon: "chevron-right", toggled: true },
  { label: "Map Icon Button (Disabled)", variant: "map", icon: "chevron-right", disabled: true },
];

const infoButtons: InfoButton<TemplateResult>[] = [
  { label: "Default active", active: true },
  { label: "Information", children: html`Dit is content in de tooltip` },
];
