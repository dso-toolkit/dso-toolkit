import { InputType } from "storybook/internal/types";

export function argTypeAction(): InputType {
  return {
    type: "function",
    control: false,
    table: {
      disable: true,
    },
  };
}
