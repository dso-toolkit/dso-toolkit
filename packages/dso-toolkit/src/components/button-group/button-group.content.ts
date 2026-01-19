import { Button, ButtonAnchor } from "../button";
import { IconButton } from "../icon-button";

import { ButtonGroupDirection } from "./button-group.models";

export function buttons(
  direction: ButtonGroupDirection,
  variant: "map" | "secondary",
  element: "button" | "anchor" | "icon-button",
): Array<Button | ButtonAnchor | IconButton> {
  const buttons: Button[] = [
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
      label: "Button 5",
      variant,
      icon: {
        icon: "chevron-right",
      },
      iconMode: "after",
    },
  ];

  const iconButtons: IconButton[] = [
    {
      label: "Inzoomen",
      variant,
      icon: "plus",
      tooltipPlacement: direction === "column" ? "right" : "bottom",
    },
    {
      label: "Uitzoomen",
      variant,
      icon: "minus",
      tooltipPlacement: direction === "column" ? "right" : "bottom",
    },
    {
      label: "Opmeten",
      variant,
      icon: "measurement",
      tooltipPlacement: direction === "column" ? "right" : "bottom",
    },
  ];

  switch (element) {
    case "icon-button":
      return iconButtons;
    case "anchor":
      return buttons.map<ButtonAnchor>((button) => ({
        ...button,
        variant: button.variant || "primary",
        url: "#",
      }));
    default:
      return buttons;
  }
}
