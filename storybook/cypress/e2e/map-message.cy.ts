const mapMessageSelector = "dso-map-message.hydrated";
const storybookBaseUrl = "http://localhost:45000/iframe.html?id=core-map-message--";

describe("dso-map-message - Storybook slot rendering", () => {
  it("renders success variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}success`);
    cy.get(mapMessageSelector).should("have.attr", "variant", "success");
    cy.get(mapMessageSelector).shadow().find(".map-message-body").should("have.attr", "role", "status");
    cy.get(mapMessageSelector).find('[slot="message"]').should("exist");
  });

  it("renders error variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}error`);
    cy.get(mapMessageSelector).should("have.attr", "variant", "error");
    cy.get(mapMessageSelector).shadow().find(".map-message-body").should("have.attr", "role", "alert");
    cy.get(mapMessageSelector).find('[slot="message"]').should("exist");
  });

  it("renders instruction variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}instruction`);
    cy.get(mapMessageSelector).should("have.attr", "variant", "instruction");
    cy.get(mapMessageSelector).shadow().find(".map-message-body").should("have.attr", "role", "status");
    cy.get(mapMessageSelector).find('[slot="message"]').should("exist");
  });

  // #3943: komen live region en melding tegelijk de DOM in, dan leest een screenreader
  // het kaartbericht niet voor.
  it("renders the live region empty first and adds the message in a later frame", () => {
    cy.visit(`${storybookBaseUrl}instruction`);
    cy.get(mapMessageSelector).should("exist");

    cy.window().then((win) => {
      type RegionState = { frame: number; slotPresent: boolean; flatText: string };

      return new Cypress.Promise<RegionState[]>((resolve) => {
        const doc = win.document;
        const states: RegionState[] = [];
        let frame = 0;

        const countFrames = () => {
          frame++;
          win.requestAnimationFrame(countFrames);
        };
        win.requestAnimationFrame(countFrames);

        const origAttachShadow = win.Element.prototype.attachShadow;
        win.Element.prototype.attachShadow = function (init: ShadowRootInit): ShadowRoot {
          const shadowRoot = origAttachShadow.call(this, init);

          if (this.tagName === "DSO-MAP-MESSAGE") {
            win.Element.prototype.attachShadow = origAttachShadow;

            const record = () => {
              const region = shadowRoot.querySelector('[role="status"], [role="alert"]');
              if (!region) {
                return;
              }

              const slot = region.querySelector<HTMLSlotElement>('slot[name="message"]');
              const flatText = slot
                ? slot
                    .assignedNodes({ flatten: true })
                    .map((node) => node.textContent)
                    .join("")
                    .trim()
                : "";

              states.push({ frame, slotPresent: slot !== null, flatText });

              if (flatText !== "") {
                resolve(states);
              }
            };

            new win.MutationObserver(record).observe(shadowRoot, { subtree: true, childList: true });
            record();
          }

          return shadowRoot;
        };

        doc.querySelector("dso-map-message")?.remove();

        const mapMessage = doc.createElement("dso-map-message");
        mapMessage.setAttribute("variant", "instruction");
        const message = doc.createElement("span");
        message.slot = "message";
        message.textContent = "Klik in de kaart om een punt te tekenen";
        mapMessage.append(message);
        doc.body.append(mapMessage);
      }).then((states) => {
        const empty = states.find((state) => !state.slotPresent);
        const filled = states.find((state) => state.flatText !== "");

        expect(empty, "live region is rendered empty first").to.not.equal(undefined);
        expect(filled, "message is added to the live region").to.not.equal(undefined);

        if (empty && filled) {
          expect(filled.frame, "message is added in a later animation frame").to.be.greaterThan(empty.frame);
        }
      });
    });
  });

  it("should be accessible", () => {
    cy.visit(`${storybookBaseUrl}success`);
    cy.injectAxe();
    cy.dsoCheckA11y(mapMessageSelector);
  });

  it("renders message and actions slots in success story", () => {
    cy.visit(`${storybookBaseUrl}success`);

    cy.get(mapMessageSelector)
      .shadow()
      .find('slot[name="message"]')
      .should("exist")
      .then(($slot) => {
        const assigned = ($slot[0] as HTMLSlotElement).assignedNodes({ flatten: true });
        const text = assigned.map((node) => node.textContent?.trim()).join(" ");
        expect(text).to.contain("Dit is een succes kaartbericht.");
      });

    cy.get(mapMessageSelector)
      .shadow()
      .find('slot[name="actions"]')
      .should("exist")
      .then(($slot) => {
        const assigned = ($slot[0] as HTMLSlotElement).assignedElements({ flatten: true });
        expect(assigned.length).to.be.greaterThan(0);
        const labels = assigned.map((el) => el.textContent?.trim());
        expect(labels).to.include("Ongedaan maken");
        expect(labels).to.include("Volgende");
      });
  });

  it("should render visually correct for each variant", () => {
    ["success", "error", "instruction"].forEach((variant) => {
      cy.visit(`${storybookBaseUrl}${variant}`);
      cy.get(mapMessageSelector).should("be.visible").shadow().find(".map-message-content").should("exist");

      // Weer aanzetten via #3776 Map Message: Flaky test
      // cy.get(mapMessageSelector).compareSnapshot(`dso-map-message-${variant}`);
    });
  });
});
