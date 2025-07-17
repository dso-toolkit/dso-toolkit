import startCase from "lodash.startcase";
import { addons } from "storybook/manager-api";

addons.setConfig({
  sidebar: {
    renderLabel: ({ name, type }) => (type === "story" ? startCase(name) : name),
  },
});
