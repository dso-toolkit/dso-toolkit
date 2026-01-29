import type { Meta } from "@storybook/web-components-vite";
import { Alert, HighlightBoxColor } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { examplePageStories } from "../../example-page-stories";
import { Templates } from "../../templates";

const meta: Meta = {
  title: "Patronen/Alert on color",
};

export default meta;

export const AlertOnColor = examplePageStories((templates) => {
  const { highlightBoxTemplate } = templates;

  return html`
    ${highlightBoxTemplate({
      color: HighlightBoxColor.grey,
      content: content(templates),
    })}
    ${highlightBoxTemplate({
      color: HighlightBoxColor.yellow,
      content: content(templates),
    })}
    ${highlightBoxTemplate({
      color: HighlightBoxColor.white,
      content: content(templates),
    })}
    ${highlightBoxTemplate({
      color: HighlightBoxColor.grey,
      content: html`
        ${highlightBoxTemplate({
          color: HighlightBoxColor.white,
          content: content(templates),
        })}
      `,
    })}
    ${highlightBoxTemplate({
      color: HighlightBoxColor.white,
      content: html`
        ${highlightBoxTemplate({
          color: HighlightBoxColor.yellow,
          content: content(templates),
        })}
      `,
    })}
  `;
});

const content = function (templates: Templates) {
  const { alertTemplate } = templates;

  const alerts: Alert<TemplateResult>[] = [
    { status: "error", message: "Dit is een foutmelding. Deze wordt getoond als er iets is misgegaan." },
    { status: "success", message: "Alles werkt prima!" },
    { status: "info", message: "Even een info-melding." },
    { status: "warning", message: "Pas op, dit moet je weten!" },
    { compact: true, status: "error", message: "Dit is een foutmelding. Deze wordt getoond als er iets is misgegaan." },
    { compact: true, status: "success", message: "Alles werkt prima!" },
    { compact: true, status: "info", message: "Even een info-melding." },
    { compact: true, status: "warning", message: "Pas op, dit moet je weten!" },
  ];

  return html` ${alerts.map((alert) => html`${alertTemplate(alert)}`)} `;
};
