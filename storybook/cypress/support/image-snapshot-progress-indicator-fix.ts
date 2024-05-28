/* Deze functie is noodzakelijk om te voorkomen dat e2e-tests met een progress-indicator gaan falen op de screenshot
   diff, omdat de spinner nooit dezelfde positie heeft. */

export function imageSnapshotProgressIndicatorFix() {
  cy.get("body")
    .then(($body) => {
      $body.prepend(
        `<style id="image-snapshot-progress-indicator-fix">
                  .dso-progress-indicator-spinner,
                  dso-icon[icon="spinner"],
                  button.dso-primary.dso-spinner-left::before,
                  button.dso-secondary.dso-spinner-left::before,
                  button.dso-tertiary.dso-spinner-left::before {
                  visibility: hidden;
                  }</style>`,
      );
    })
    .get("#image-snapshot-progress-indicator-fix")
    .should("exist");
}
