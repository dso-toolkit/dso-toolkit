import { test, expect } from "./fixtures";

import * as sinon from "sinon";

test.describe("Card", () => {
  test("should call dsoCardClicked event when user clicks a non-interactive element in card", async ({ page }) => {
    await page.goto("/iframe.html?id=core-card--href-and-selectable-with-button");

    // const stub = sinon.stub().;
    const card = page.locator("dso-card");
    await card.evaluate((el) => console.log("hallo!", el));

    await card.click();

    // $card.locator("dso-selectable > .dso-selectable-container > .dso-selectable-input-wrapper > input").focus();

    // expect(stub).toHaveBeenCalled();
  });

  // test("should call dsoCardClicked event when user clicks a non-interactive element in card", async ({ page }) => {
  //   await page
  //     .locator("dso-card")
  //     .locator("dso-selectable > .dso-selectable-container > .dso-selectable-input-wrapper > input")
  //     .focus();
  //   page
  //     .locator("dso-card")
  //     .locator("dso-selectable > .dso-selectable-container > .dso-selectable-input-wrapper > input")
  //     .FIXME_realClick();
  //   await dsoCardClickedListener.FIXME_should("not.have.been.called");
  //   page.locator("dso-card").locator(".dso-card-interaction").first().FIXME_realClick();
  //   await dsoCardClickedListener.FIXME_should("not.have.been.called");
  //   page.locator("dso-card").FIXME_realClick();
  //   await dsoCardClickedListener.FIXME_should("have.been.calledOnce");
  // });

  // test("should not call dsoCardClicked on toggletip", async ({ page }) => {
  //   const $cardInteractions = page.locator("dso-card").locator("div[slot='interactions']");
  //   $cardInteractions.FIXME_append(
  //     '<div class="dso-card-interaction"><dso-toggletip label="Toon informatie" position="left" class="hydrated">Extra informatie</dso-toggletip></div>',
  //   );
  //   await page.locator("dso-card").locator(".dso-card-interaction > dso-toggletip").click();
  //   await dsoCardClickedListener.FIXME_should("not.have.been.called");
  // });

  // test("should set isModifiedEvent when the card event is triggered with modifiers (eg. holding CTRL or right-click)", async ({
  //   page,
  // }) => {
  //   await page.goto("http://localhost:45000/iframe.html?id=core-card--selectable");
  // });

  // test("should not call events when clickable is false", async ({ page }) => {
  //   page.locator("dso-card").FIXME_invoke("attr", "clickable", "false");
  //   page.locator("dso-card").FIXME_realClick();
  //   await dsoCardClickedListener.FIXME_should("not.have.been.called");
  // });

  // test("should have correct image dimensions", async ({ page }) => {
  //   await page.goto("http://localhost:45000/iframe.html?id=core-card--href-with-image");
  //   await expect(page.locator("dso-card").locator("img[slot='image']")).toHaveCSS("height", "24px");
  //   await expect(page.locator("dso-card").locator("img[slot='image']")).toHaveCSS("width", "24px");
  //   page.locator("dso-card").FIXME_invoke("attr", "image-shape", "wide");
  //   await expect(page.locator("dso-card").locator("img[slot='image']")).toHaveCSS("height", "26px");
  //   await expect(page.locator("dso-card").locator("img[slot='image']")).toHaveCSS("width", "30px");
  // });

  // test("creates anchor when href is set", async ({ page }) => {
  //   await page.goto("http://localhost:45000/iframe.html?id=core-card--static");
  //   page.locator("dso-card").FIXME_invoke("prop", "href", "#");
  //   page.locator("dso-card").FIXME_shadow();
  //   await expect(page.locator("dso-card").locator("a.heading-anchor")).toHaveAttribute("href", "#");
  // });

  // test("creates anchor to external link when href is set and mode is set to 'extern'", async ({ page }) => {
  //   await page.goto("http://localhost:45000/iframe.html?id=core-card--static");
  //   page.locator("dso-card").FIXME_invoke("prop", "href", "#");
  //   page.locator("dso-card").FIXME_invoke("prop", "mode", "extern");
  //   page.locator("dso-card").FIXME_shadow();
  //   const anchorHeadingSection = page.locator("dso-card").locator("a.heading-anchor");
  //   await expect(page.locator("dso-card").locator("a.heading-anchor")).toHaveAttribute("href", "#");
  //   await expect(page.locator("dso-card").locator("a.heading-anchor")).toHaveAttribute("target", "_blank");
  //   await expect(page.locator("dso-card").locator("a.heading-anchor")).toHaveAttribute("rel", "noopener noreferrer");
  //   page.locator("dso-card").locator("a.heading-anchor").locator("dso-icon").FIXME_shadow();
  //   await expect(
  //     page.locator("dso-card").locator("a.heading-anchor").locator("dso-icon").locator("svg"),
  //   ).toHaveAttribute("id", "external-link");
  //   await expect(anchorHeadingSection.locator("span.sr-only")).toHaveText("(Opent andere website in nieuw tabblad)");
  // });

  // test("creates anchor to download link when href is set and mode is set to 'download'", async ({ page }) => {
  //   await page.goto("http://localhost:45000/iframe.html?id=core-card--static");
  //   page.locator("dso-card").FIXME_invoke("prop", "href", "#");
  //   page.locator("dso-card").FIXME_invoke("prop", "mode", "download");
  //   page.locator("dso-card").FIXME_shadow();
  //   await expect(page.locator("dso-card").locator("a.heading-anchor")).toHaveAttribute("href", "#");
  //   page.locator("dso-card").locator("a.heading-anchor").locator("dso-icon").FIXME_shadow();
  //   await expect(
  //     page.locator("dso-card").locator("a.heading-anchor").locator("dso-icon").locator("svg"),
  //   ).toHaveAttribute("id", "download");
  // });
});
