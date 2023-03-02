const css = `
  dso-header dso-icon,
  dso-header svg.di,
  dso-header dso-dropdown-menu {
    visibility: hidden !important;
  }
`;

export function percyHeaderFix() {
  cy.get("body").then(($body) => {
    const $header = $body.find("dso-header");

    if ($header.length > 0) {
      Cypress.$("head").append(`<style id="percy-header-fix">${css}</style>`);

      cy.get("#percy-header-fix").should("exist");
    }
  });
}
