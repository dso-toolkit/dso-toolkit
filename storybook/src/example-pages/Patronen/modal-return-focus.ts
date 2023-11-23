import { html, nothing, render } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";

examplePageFactory(
  "Patronen",
  "Modal return focus",
  ({ buttonTemplate, modalTemplate }) => html`
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
                  body: html`<p>${buttonTemplate({ label: "Bevestigen", type: "button", variant: "primary" })}</p>
                    <p>
                      ${buttonTemplate({ label: "Bevestigen", type: "button", variant: "primary", autofocus: true })}
                    </p>`,
                  footer: buttonTemplate({ label: "Bevestigen", type: "button", variant: "primary" }),
                  showCloseButton: true,
                  dsoClose: () => render(nothing, container),
                }),
                container,
              );
            }
          },
        })}
      </main>
    </div>
  `,
);
