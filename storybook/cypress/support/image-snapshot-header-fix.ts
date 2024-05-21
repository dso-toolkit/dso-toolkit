const css = `
  dso-header dso-icon,
  dso-header svg.di,
  dso-header dso-dropdown-menu {
    visibility: hidden !important;
  }
`;

export function imageSnapshotHeaderFix() {
  cy.get("body").then(($body) => {
    const $header = $body.find("dso-header");

    if ($header.length > 0) {
      Cypress.$("head").append(`<style id="image-snapshot-header-fix">${css}</style>`);

      cy.get("#image-snapshot-header-fix").should("exist");
    }
  });
}
