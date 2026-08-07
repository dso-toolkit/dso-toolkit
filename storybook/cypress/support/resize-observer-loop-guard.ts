// Fails a test when the browser reports "ResizeObserver loop completed with undelivered
// notifications" during that test. Chrome does not print this error to the console and
// Cypress does not treat it as an uncaught exception, so without this guard it goes
// unnoticed in CI while error trackers in consuming applications do log it.
//
// Note: a failure in an afterEach hook makes Cypress skip the remaining tests in the
// spec file. That is acceptable for this guard: one hit should fail the run.
const resizeObserverLoopErrors: string[] = [];

Cypress.on("window:before:load", (win) => {
  win.addEventListener("error", (event) => {
    if (typeof event.message === "string" && event.message.includes("ResizeObserver loop")) {
      resizeObserverLoopErrors.push(event.message);
    }
  });
});

beforeEach(() => {
  resizeObserverLoopErrors.length = 0;
});

afterEach(() => {
  if (resizeObserverLoopErrors.length > 0) {
    throw new Error(`ResizeObserver loop error(s) during this test:\n${resizeObserverLoopErrors.join("\n")}`);
  }
});
