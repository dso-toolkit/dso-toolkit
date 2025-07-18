import { Button, ButtonAnchor } from "../button/button.models";

import { ButtonGroupDirection } from "./button-group.models";

export function buttons(
  direction: ButtonGroupDirection,
  variant: Button["variant"] | ButtonAnchor["variant"],
  element: "button" | "anchor",
): Button[] | ButtonAnchor[] {
  const url = element === "anchor" ? "#" : undefined;

  const b: Button[] = [
    {
      label: "Button 1",
      variant,
    },
    {
      label: "Button 2",
      variant,
    },
    {
      label: "Button 3",
      variant,
    },
    {
      label: "Button 4",
      variant,
      icon: {
        icon: "chevron-left",
      },
    },
    {
      label: "Hamer",
      variant,
      icon: {
        icon: "hammer",
      },
      iconMode: direction === "row" ? "only" : undefined,
    },
    {
      label: "Button 5",
      variant,
      icon: {
        icon: "chevron-right",
      },
      iconMode: "after",
    },
  ];

  return url
    ? b.map<ButtonAnchor>((button) => ({
        ...button,
        variant: button.variant || "primary",
        url,
      }))
    : b;
}
