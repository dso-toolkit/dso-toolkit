import { DocumentComponentMarkFunction } from "@dso-toolkit/core/src/components";

describe("Document Component", () => {
  it("should mark and highlight", () => {
    const marker: DocumentComponentMarkFunction = (text, source) =>
      text
        .split(new RegExp(`(k)`, "gi"))
        .map((item, index) => (isOdd(index) ? { text: item, highlight: source === "label" && index === 1 } : item));

    cy.visit("http://localhost:45000/iframe.html?id=core-document-component--default")
      .get("dso-document-component")
      .then(($documentComponent) => ($documentComponent[0].mark = cy.spy(marker).as("marker")))
      .get("@marker")
      .invoke("getCalls")
      .should("have.length", 3)
      .then((calls) => calls.map((c) => c.args))
      .should("have.deep.members", [
        ["Overgangsrecht: rijksbeschermde stads- en dorpsgezichten", "opschrift"],
        ["Artikel", "label"],
        ["3.3", "nummer"],
      ]);
  });
});

function isOdd(n: number): boolean {
  return Math.abs(n % 2) === 1;
}
