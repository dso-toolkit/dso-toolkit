import { jsxDecorator } from "storybook-addon-jsx";
import { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    jsx: {
      // I have no idea what type this is, and how this works. /Th
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
  },
};

export default preview;
