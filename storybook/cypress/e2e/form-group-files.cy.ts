describe("Form Group Files", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=voorbeeldpagina-s-toepassingen-aanvragen-documenten--documenten");
  });

  it("keeps 8px between rich content and the upload button in an accordion section", () => {
    cy.get("dso-accordion-section.hydrated")
      .first()
      .find(".dso-rich-content + .form-group.dso-files")
      .then(($files) => {
        const richContent = $files.prev(".dso-rich-content")[0]!;
        const upload = $files.find(".dso-file-upload label")[0]!;
        const gap = upload.getBoundingClientRect().top - richContent.getBoundingClientRect().bottom;

        expect(gap, "gap between rich content and upload button").to.be.closeTo(8, 0.5);
      });
  });

  it("does not render an empty label container", () => {
    cy.get("dso-accordion-section.hydrated").first().find(".dso-files .dso-label-container").should("not.exist");
  });
});
