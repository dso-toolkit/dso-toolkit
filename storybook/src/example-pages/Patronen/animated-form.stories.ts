import type { Meta } from "@storybook/web-components";
import { TemplateResult, html } from "lit-html";
import { createRef, ref } from "lit-html/directives/ref.js";

import { examplePageStories } from "../../example-page-stories";
import { header } from "../content/header.content";
import { mainMenu } from "../content/main-menu.content";
import { footerPartial } from "../partials/footer";
import { headerPartial } from "../partials/header";

const meta: Meta = {
  title: "Patronen/Animated Form",
};

export default meta;

export const AnimatedForm = examplePageStories((templates) => {
  const { applicationHeadingTemplate, expandableTemplate, formGroupRadiosTemplate, formGroupInputTemplate } = templates;

  const radioWrapperRef = createRef<HTMLDivElement>();

  const template = (): TemplateResult => html`
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
      <span ${ref(radioWrapperRef)}>
        ${formGroupRadiosTemplate({
          group: "radios",
          id: "eigenaar-verzoek-radio",
          label: "Voor wie start u dit project?",
          inline: true,
          selectables: [
            {
              id: "eigenaar-verzoek-radio-1",
              name: "eigenaar-verzoek",
              label: "Voor mezelf",
              value: "mezelf",
              type: "radio",
            },
            {
              id: "eigenaar-verzoek-radio-2",
              name: "eigenaar-verzoek",
              label: "Iemand anders",
              value: "iemandanders",
              type: "radio",
            },
          ],
        })}
      </span>
      ${expandableTemplate({
        open: false,
        enableAnimation: true,
        content: html`${formGroupInputTemplate({
          group: "input",
          id: "naam",
          type: "text",
          label: "Uw naam",
          value: "",
        })}
        ${formGroupInputTemplate({
          group: "input",
          id: "adresgegevens",
          type: "text",
          label: "Adres",
          value: "",
        })}`,
      })}
      <div class="dso-form-buttons">
        <button type="button" class="dso-primary">
          <span>Verzenden</span>
        </button>
      </div>
    </form>
  `;

  const fullTemplate = html`
    <div class="container">
      ${headerPartial(templates, {
        ...header,
        mainMenu: mainMenu("Aanvragen"),
      })}
      <main>${template()}</main>
      ${footerPartial(templates)}
    </div>
  `;

  function addEventListenersToRadios() {
    const radios = radioWrapperRef.value?.querySelectorAll('input[type="radio"][name="eigenaar-verzoek"]');

    radios?.forEach((radio) => {
      radio.addEventListener("change", (event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement) {
          const expandable = document.querySelector("dso-expandable");
          if (expandable) {
            expandable.open = target.value === "mezelf";
          }
        }
      });
    });
  }

  // DOM build up
  setTimeout(() => {
    addEventListenersToRadios();
  });

  return fullTemplate;
});
