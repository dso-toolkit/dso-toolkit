import { html } from "lit-html";
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
            modalTemplate({
              modalTitle: "Modal",
              body: html`test`,
              footer: buttonTemplate({ label: "Bevestigen", type: "button", variant: "primary" }),
              showCloseButton: true,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              dsoClose: () => (window as any).modalRef.close(),
            });
          },
        })}

        <h2>ModalElement.returnFocus</h2>
        <p>
          Er kan ook een element worden aangewezen. In dit voorbeeld zal de focus naar bovenstaande knop "Open modal"
          gaan. teruggaan.
        </p>
        ${buttonTemplate({
          label: "Open modal met returnFocus",
          variant: "primary",
          onClick: () => {
            modalTemplate({
              modalTitle: "Modal",
              body: html`test`,
              footer: buttonTemplate({ label: "Bevestigen", type: "button", variant: "primary" }),
              showCloseButton: true,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              dsoClose: () => (window as any).modalRef.close(),
              returnFocus: () => {
                const button = document.querySelector<HTMLButtonElement>("button#activate-modal");
                if (!button) {
                  throw new Error("No button#activate-modal found");
                }

                return button;
              },
            });
          },
        })}
      </main>
    </div>
  `;
});
