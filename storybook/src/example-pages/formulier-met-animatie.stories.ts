import type { Meta } from "@storybook/web-components";
import { TemplateResult, html, render } from "lit-html";
import { createRef, ref } from "lit-html/directives/ref.js";

import { examplePageStories } from "../example-page-stories";

import { header } from "./content/header.content";
import { mainMenu } from "./content/main-menu.content";
import { footerPartial } from "./partials/footer";
import { headerPartial } from "./partials/header";

const meta: Meta = {
  title: "Voorbeeldpagina's/Formulier met animatie",
};

export default meta;

export const FormAnimated = examplePageStories((templates) => {
  const { applicationHeadingTemplate, formGroupRadiosTemplate, formGroupInputTemplate } = templates;

  const contentRef = createRef<HTMLDivElement>();

  const state = {
    visible: false,

    update: () => {
      if (contentRef.value) {
        render(state.template(), contentRef.value);
      }
    },

    toggleInputVisiblity: () => {
      state.visible = !state.visible;
      state.update();
    },

    template: (): TemplateResult => html`
      <form class="form-horizontal">
        ${applicationHeadingTemplate({
          title: "Aanvragen",
          subtitle: "1. Project",
          step: "Stap 1/7",
        })}
        ${formGroupInputTemplate({
          group: "input",
          id: "vraag-1",
          type: "text",
          label: "Wat is de naam van uw project?",
        })}
        ${formGroupInputTemplate({
          group: "input",
          id: "vraag-2",
          type: "text",
          label: "Projectomschrijving",
        })}
        ${formGroupRadiosTemplate({
          group: "radios",
          id: "conceptverzoek-radio",
          label: "Wilt u uw verzoeken definitief of als conceptverzoek indienen?",
          inline: true,
          selectables: [
            {
              id: "conceptverzoek-radio-1",
              label: "Conceptverzoek",
              value: "conceptverzoek",
              type: "radio",
              info: {
                id: "conceptverzoek-radio-1-info",
                content: html`<div slot="info">Dit is een conceptverzoek</div>`,
                fixed: false,
              },
            },
            {
              id: "conceptverzoek-radio-2",
              label: "Definitief",
              value: "definitief",
              type: "radio",
              info: {
                id: "conceptverzoek-radio-2-info",
                content: html`<div slot="info">Dit is een definitief verzoek</div>`,
                fixed: false,
              },
            },
          ],
        })}
        <dso-expandable enable-animation open=${state.visible}>
          ${formGroupInputTemplate({
            group: "input",
            id: "vraag 3",
            type: "text",
            label: "Vul hier uw antwoord in",
            value: "Placeholder ",
            required: true,
          })}
        </dso-expandable>
      </form>
    `,
  };

  // render volledige pagina inclusief lege contentRef container
  const fullTemplate = html`
    <div class="container">
      ${headerPartial(templates, {
        ...header,
        mainMenu: mainMenu("Maatregelen op maat"),
      })}
      <main>
        <div ${ref(contentRef)}></div>
      </main>
      ${footerPartial(templates)}
    </div>
  `;

  // Laat Lit eerst het DOM opbouwen
  setTimeout(() => {
    state.update(); // eerste render van het formulier

    setTimeout(() => {
      const checkbox = document.querySelector<HTMLInputElement>("#checkbox_1");
      if (checkbox) {
        checkbox.addEventListener("change", () => {
          state.toggleInputVisiblity();
        });
      }
    });
  });

  return fullTemplate;
});
