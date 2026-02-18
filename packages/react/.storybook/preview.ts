import { Parameters } from "storybook/internal/types";

import "@iframe-resizer/child";
import "dso-toolkit/dist/dso.css";

// @stencil/react-output-target does not pass displayName to @lit/react's createComponent,
// and the Stencil-compiled element classes are anonymous (empty .name).
// Without this, Storybook's code panel shows <React.ForwardRef> instead of component names.
import * as Components from "../src/components";

for (const [name, component] of Object.entries(Components)) {
  const c = component as unknown as Record<string, unknown>;
  if (c && typeof c === "object" && "displayName" in c && !c.displayName) {
    c.displayName = name;
  }
}

export const parameters: Parameters = {
  controls: {
    disableSaveFromUI: true,
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
      type: "dynamic",
    },
  },
};

export const tags = ["autodocs"];
