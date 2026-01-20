import { Button, ButtonAnchor } from "../button";
import { IconButton } from "../icon-button";

import { ButtonGroupDirection } from "./button-group.models";

export function buttons(
  direction: ButtonGroupDirection,
  variant: "map" | "secondary",
): Array<Button | ButtonAnchor | IconButton> {
  return [
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
      url: "#",
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
      icon: "hammer",
      tooltipPlacement: direction === "column" ? "right" : "bottom",
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
}
