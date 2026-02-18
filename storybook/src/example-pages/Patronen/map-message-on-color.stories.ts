import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../../example-page-stories";
import { Templates } from "../../templates";

interface MapMessage {
  variant: "success" | "error" | "instruction";
  message: string;
  showButtons?: boolean;
  buttonLabels?: string[];
  buttonIcons?: string[];
}

const meta: Meta = {
  title: "Patronen/Map Message on color",
};

export default meta;

export const MapMessageOnColor = examplePageStories((templates) => {
  const { highlightBoxTemplate } = templates;

  return html`
    ${highlightBoxTemplate({
      grey: true,
      content: content(templates),
    })}
    ${highlightBoxTemplate({
      yellow: true,
      content: content(templates),
    })}
    ${highlightBoxTemplate({
      white: true,
      content: content(templates),
    })}
    ${highlightBoxTemplate({
      grey: true,
      content: html`
        ${highlightBoxTemplate({
          white: true,
          content: content(templates),
        })}
      `,
    })}
    ${highlightBoxTemplate({
      white: true,
      content: html`
        ${highlightBoxTemplate({
          yellow: true,
          content: content(templates),
        })}
      `,
    })}
  `;
});

const content = function (templates: Templates) {
  const { mapMessageTemplate } = templates;

  const messages: MapMessage[] = [
    {
      variant: "success",
      message: "Dit is een succesbericht",
      showButtons: true,
      buttonLabels: ["Ongedaan maken", "Volgende"],
      buttonIcons: ["undo", "chevron-right"],
    },
    {
      variant: "success",
      message: "Dit is een succesbericht zonder acties",
      showButtons: false,
    },
  ];

  return html` ${messages.map((message) => html`${mapMessageTemplate(message)}`)} `;
};
