import { html } from "lit-html";
import { createRef, ref } from "lit-html/directives/ref.js";

import { Templates } from "../../templates";

export function getAnimatedFormContent(templates: Templates) {
  const { expandableTemplate, formGroupRadiosTemplate, formGroupInputTemplate } = templates;

  const radioWrapperRef = createRef<HTMLDivElement>();

  const content = html`<span ${ref(radioWrapperRef)}>
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
    })}`;

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

  return content;
}
