import { Preview } from "@storybook/react";
import { jsxDecorator } from "storybook-addon-jsx";

const preview: Preview = {
  parameters: {
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
    decorators: [jsxDecorator],
    options: {
      storySort: {
        method: "alphabetically",
      },
    },
  },
};

export default preview;
