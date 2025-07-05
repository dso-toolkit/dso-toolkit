import type { Meta } from "@storybook/web-components-vite";
import { html, nothing, render } from "lit-html";

import { examplePageStories } from "../../example-page-stories";

const meta: Meta = {
  title: "Patronen/Modal return focus",
};

export default meta;

const ModalReturnFocus = examplePageStories((templates) => {
  const { buttonTemplate, modalTemplate } = templates;

  return html`
    <div class="container">
      <main>
        <h1>Modal focus return</h1>
        <p>
          Als de Modal wordt gesloten gaat de focus terug naar het element wat focus had voordat de Modal was geopend.
        </p>
        ${buttonTemplate({
          id: "activate-modal",
          label: "Open modal",
          variant: "primary",
          onClick: () => {
            const container = document.querySelector("main");

            if (container) {
              render(
                modalTemplate({
                  modalTitle: "Modal",
                  body: html`<p>Onderstaande knoppen doen niets, alleen de sluiten knop sluit de Modal.</p>
                    <p>${buttonTemplate({ label: "Eerste knop", type: "button", variant: "primary" })}</p>
                    <p>
                      ${buttonTemplate({
                        label: "Tweede knop met autofocus",
                        type: "button",
                        variant: "primary",
                        autofocus: true,
                      })}
                    </p>`,
                  footer: buttonTemplate({ label: "Bevestigen", type: "button", variant: "primary" }),
                  closable: true,
                  dsoClose: () => render(nothing, container),
                }),
                container,
              );
            }
          },
        })}
      </main>
    </div>
  `;
});

export { ModalReturnFocus };
