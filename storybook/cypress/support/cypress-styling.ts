/* Deze functie is noodzakelijk om te voorkomen dat e2e-tests met een progress-indicator gaan falen op de screenshot
   diff, omdat de spinner nooit dezelfde positie heeft. */

export function cypressStyling() {
  return cy
    .get("body")
    .then(($body) => {
      $body.prepend(`
        <style id="cypress-styling">
          * {
            caret-color: transparent !important; /* prevent the blinking caret in the input field which leads to a false positive for matchImageSnapshot() */
          }

          .dso-progress-indicator-spinner,
          dso-icon[icon="spinner"],
          button.dso-primary.dso-spinner-left::before,
          button.dso-secondary.dso-spinner-left::before,
          button.dso-tertiary.dso-spinner-left::before {
            visibility: hidden;
          }
          
          /* Om te voorkomen dat e2e-tests gaan falen op de screenshot diff zetten we "scroll-behavior: smooth;" uit */
          html { scroll-behavior: inherit !important; }

          /**
           * Tijdelijke fix voor flaky tests op voorbeeldpagina's. Dit zorgt ervoor dat dso-header alleen zichtbaar is op de component pagina en verborgen is op alle voorbeeldpagina's
           * Todo: #2693
           */
          :not(#dt-i18n-decorator-container) > dso-header {
            display: none;
          }
        </style>
      `);
    })
    .get("#cypress-styling")
    .should("exist");
}
