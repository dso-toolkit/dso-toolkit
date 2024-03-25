import { expect as baseExpect } from "@playwright/test";
import * as sinon from "sinon";

export { test } from "@playwright/test";

export const expect = baseExpect.extend({
  toHaveBeenCalledWith: (spy: sinon.SinonSpy, ...args: any) => {
    const pass = spy.calledWith(...args);
    if (pass) {
      return {
        pass: true,
        message: () => `Error: \n Received: ${spy.args} \n Expected: ${args}`,
      };
    }

    return {
      pass: false,
      message: () => `Error: \n Received: ${spy.args} \n Expected: ${args}`,
    };
  },
  toHaveBeenCalled: (spy: sinon.SinonSpy) => {
    const pass = spy.called;
    if (pass) {
      return {
        pass: true,
        message: () => `Error: \n function ${spy.printf("%n")} has been called`,
      };
    }

    return {
      pass: false,
      message: () => `Error: \n function ${spy.printf("%n")} has not been called`,
    };
  },
});
