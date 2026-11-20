import { waitForComponents } from "../support/wait-for-components";

const mapMessageSelector = "dso-map-message.hydrated";
const storybookBaseUrl = "http://localhost:45000/iframe.html?id=core-map-message--";
const variants = [
  { name: "success", role: "status", hasActions: true, hasIcon: true },
  { name: "error", role: "alert", hasActions: true, hasIcon: true },
  { name: "instruction", role: "status", hasActions: false, hasIcon: false },
] as const;

type RegionState = { frame: number; slotPresent: boolean; flatText: string };

function visitStory(name: string) {
  cy.visit(`${storybookBaseUrl}${name}`);
}

function mapMessageContent() {
  return cy.get(mapMessageSelector).shadow().find(".map-message-content");
}

function withAssignedSlot(slotName: string, assertion: (slot: HTMLSlotElement) => void) {
  cy.window().then((win) => {
    cy.get(mapMessageSelector)
      .shadow()
      .find(`slot[name="${slotName}"]`)
      .should(($slot) => {
        const element = $slot[0];
        expect(element).to.be.instanceOf(win.HTMLSlotElement);

        if (element instanceof win.HTMLSlotElement) {
          assertion(element);
        }
      });
  });
}

function assertAssignedSlotText(slotName: string, assertion: (text: string) => void) {
  withAssignedSlot(slotName, (slot) => {
    const text = slot
      .assignedNodes({ flatten: true })
      .map((node) => node.textContent)
      .join("")
      .trim();

    assertion(text);
  });
}

function observeLiveRegion(win: Cypress.AUTWindow, mount: (doc: Document) => void) {
  return new Cypress.Promise<RegionState[]>((resolve) => {
    const states: RegionState[] = [];
    let frame = 0;
    let settled = false;
    let animationFrame: number;
    let observer: MutationObserver | undefined;
    const originalAttachShadow = win.Element.prototype.attachShadow;

    const cleanup = () => {
      settled = true;
      observer?.disconnect();
      win.Element.prototype.attachShadow = originalAttachShadow;

      win.cancelAnimationFrame(animationFrame);
    };

    const countFrames = () => {
      if (settled) {
        return;
      }

      frame++;
      animationFrame = win.requestAnimationFrame(countFrames);
    };
    animationFrame = win.requestAnimationFrame(countFrames);

    win.Element.prototype.attachShadow = function (init: ShadowRootInit): ShadowRoot {
      const shadowRoot: ShadowRoot = originalAttachShadow.call(this, init);

      if (this.tagName === "DSO-MAP-MESSAGE") {
        win.Element.prototype.attachShadow = originalAttachShadow;

        const record = () => {
          if (settled) {
            return;
          }

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
            cleanup();
            resolve(states);
          }
        };

        observer = new win.MutationObserver(record);
        observer.observe(shadowRoot, { subtree: true, childList: true });
        record();
      }

      return shadowRoot;
    };

    mount(win.document);
  });
}

describe("dso-map-message - Storybook slot rendering", () => {
  variants.forEach(({ name, role }) => {
    it(`renders ${name} variant and ARIA role`, () => {
      visitStory(name);
      cy.get(mapMessageSelector).should("have.attr", "variant", name);
      cy.get(mapMessageSelector).shadow().find(".map-message-body").should("have.attr", "role", role);
      cy.get(mapMessageSelector).find('[slot="message"]').should("exist");
    });
  });

  // #3943: komen live region en melding tegelijk de DOM in, dan leest een screenreader
  // het kaartbericht niet voor.
  it("renders the live region empty first and adds the message in a later frame", () => {
    visitStory("instruction");
    cy.get(mapMessageSelector).should("exist");

    cy.window()
      .then((win) =>
        observeLiveRegion(win, (doc) => {
          doc.querySelector("dso-map-message")?.remove();
          const mapMessage = doc.createElement("dso-map-message");
          mapMessage.setAttribute("variant", "instruction");
          const message = doc.createElement("span");
          message.slot = "message";
          message.textContent = "Klik in de kaart om een punt te tekenen";
          mapMessage.append(message);
          doc.body.append(mapMessage);
        }),
      )
      .then((states) => {
        const empty = states.find((state) => !state.slotPresent);
        const filled = states.find((state) => state.flatText !== "");

        expect(empty, "live region is rendered empty first").to.not.equal(undefined);
        expect(filled, "message is added to the live region").to.not.equal(undefined);

        if (empty && filled) {
          expect(filled.frame, "message is added in a later animation frame").to.be.greaterThan(empty.frame);
        }
      });
  });

  it("should be accessible", () => {
    visitStory("success");

    assertAssignedSlotText("message", (text) => expect(text).to.not.equal(""));

    cy.injectAxe();
    cy.dsoCheckA11y(mapMessageSelector);
  });

  it("renders message and actions slots in success story", () => {
    visitStory("success");

    assertAssignedSlotText("message", (text) => expect(text).to.contain("Dit is een succes kaartbericht."));

    withAssignedSlot("actions", (slot) => {
      const labels = slot.assignedElements({ flatten: true }).map((element) => element.textContent?.trim());
      expect(labels).to.include("Ongedaan maken");
      expect(labels).to.include("Volgende");
    });
  });

  it("removes has-actions when all action elements are removed", () => {
    visitStory("success");

    mapMessageContent().should("have.class", "has-actions");

    cy.get(mapMessageSelector)
      .find('[slot="actions"]')
      .then(($actions) => {
        $actions.remove();
      });

    mapMessageContent().should("not.have.class", "has-actions");
  });

  variants.forEach(({ name: variant, hasActions, hasIcon }) => {
    it(`should render visually correct for ${variant} variant`, () => {
      visitStory(variant);

      waitForComponents();

      cy.get(mapMessageSelector).should("be.visible");
      assertAssignedSlotText("message", (text) => expect(text).to.not.equal(""));

      mapMessageContent().should(hasActions ? "have.class" : "not.have.class", "has-actions");
      if (hasIcon) {
        cy.get(mapMessageSelector).shadow().find("dso-icon.map-message-icon").should("have.class", "hydrated");
      } else {
        cy.get(mapMessageSelector).shadow().find("dso-icon.map-message-icon").should("not.exist");
      }

      cy.get(mapMessageSelector).matchImageSnapshot(`dso-map-message-${variant}`);
    });
  });
});
