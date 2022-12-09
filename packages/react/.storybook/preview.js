import { jsxDecorator } from "storybook-addon-jsx";

export const parameters = {
  jsx: {
    displayName: function getDisplayName(ReactElement) {
      return (
        ReactElement.type?.render?.displayName ??
        (ReactElement.type.displayName ||
          (ReactElement.type.name !== "_default" ? ReactElement.type.name : null) ||
          (typeof ReactElement.type === "function" ? "No Display Name" : ReactElement.type))
      );
    },
  },
};

export const decorators = [jsxDecorator];
