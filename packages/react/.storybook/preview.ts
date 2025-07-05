import { Parameters } from "storybook/internal/types";

import "@iframe-resizer/child";
import "dso-toolkit/dist/dso.css";

export const parameters: Parameters = {
  jsx: {
    // I have no idea what type this is and how it works. /Th
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    displayName: function getDisplayName(ReactElement: any) {
      return (
        ReactElement.type?.render?.displayName ??
        (ReactElement.type.displayName ||
          (ReactElement.type.name !== "_default" ? ReactElement.type.name : null) ||
          (typeof ReactElement.type === "function" ? "No Display Name" : ReactElement.type))
      );
    },
  },
  options: {
    storySort: {
      method: "alphabetically",
    },
  },
  docs: {
    codePanel: true,
    source: {
      excludeDecorators: true,
    },
  },
};

export const tags = ["autodocs"];
