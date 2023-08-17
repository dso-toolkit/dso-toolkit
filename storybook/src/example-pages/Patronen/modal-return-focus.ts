/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, render } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";

examplePageFactory("Patronen", "Modal return focus", ({ buttonTemplate, modalTemplate }) => {
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

            const modal = document.querySelector("dso-modal");

            if (container && !modal) {
              render(
                modalTemplate({
                  modalTitle: "Modal",
                  body: html`test`,
                  footer: buttonTemplate({ label: "Bevestigen", type: "button", variant: "primary" }),
                  showCloseButton: true,
                  dsoClose: () => {
                    const modal = document.querySelector("dso-modal");

                    if (modal) {
                      modal.close();
                    }
                  },
                }),
                container
              );
            } else if (modal) {
              modal.show();
            }
          },
        })}
      </main>
    </div>
  `;
});
