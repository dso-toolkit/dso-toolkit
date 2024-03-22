import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/iframe.html?id=core-alert--success");

  await expect(page.getByRole("button", { name: "Button" })).toBeVisible();
});

const statuses: Array<{
  status: string;
  message: string;
  icon: string;
}> = [
  { status: "success", message: "Gelukt", icon: "status-success" },
  { status: "info", message: "Opmerking", icon: "status-info" },
  { status: "warning", message: "Waarschuwing", icon: "status-warning" },
  { status: "error", message: "Fout", icon: "status-error" },
];

for (const { status, message, icon } of statuses) {
  test(`should have appropriate message and icon for status "${status}"`, async ({ page }) => {
    await page.goto("/iframe.html?id=core-alert--success");

    const alert = page.locator("dso-alert");
    await alert.evaluate((el, status) => el.setAttribute("status", status), status);

    const srOnly = alert.locator(".alert > span.sr-only");
    await expect(srOnly).toHaveText(`${message}:`);

    const dsoIcon = alert.locator(".alert > dso-icon");
    await expect(dsoIcon).toHaveAttribute("icon", icon);

    await expect(alert).toHaveScreenshot();
  });
}
