/* eslint-disable @typescript-eslint/no-explicit-any */
import { html } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";

examplePageFactory("Patronen", "Modal return focus", ({ buttonTemplate }) => {
  const createModal = (returnFocus?: any) => {
    const modal = document.createElement("dso-modal");

    modal.setAttribute("modal-title", "Modal");

    const body = document.createElement("div");
    body.setAttribute("slot", "body");
    body.innerText = "test";

    const footer = document.createElement("div");
    footer.setAttribute("slot", "footer");
    footer.innerHTML = "<button type='button' class='dso-primary'>Bevestigen</button>";

    modal.appendChild(body);
    modal.appendChild(footer);

    modal.addEventListener("dsoClose", () => document.querySelector("main")?.removeChild(modal));

    if (returnFocus) {
      (modal as any).returnFocus = returnFocus;
    }

    return modal;
  };

  const openModal = () => document.querySelector("main")?.appendChild(createModal());
  const openModalWithReturn = (returnFocus: any) =>
    document.querySelector("main")?.appendChild(createModal(returnFocus));

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
          onClick: openModal,
        })}

        <h2>ModalElement.returnFocus</h2>
        <p>
          Er kan ook een element worden aangewezen. In dit voorbeeld zal de focus naar bovenstaande knop "Open modal"
          gaan. teruggaan.
        </p>
        ${buttonTemplate({
          label: "Open modal met returnFocus",
          variant: "primary",
          onClick: () =>
            openModalWithReturn(() => {
              const button = document.querySelector<HTMLButtonElement>("button#activate-modal");
              if (!button) {
                throw new Error("No button#activate-modal found");
              }

              return button;
            }),
        })}
      </main>
    </div>
  `;
});
