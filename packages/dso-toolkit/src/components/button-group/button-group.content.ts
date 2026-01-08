import { Button, ButtonAnchor } from "../button";
import { IconButton } from "../icon-button";

export function buttons(
  variant: "map" | "secondary",
  element: "button" | "anchor" | "icon-button",
): Button[] | ButtonAnchor[] | IconButton[] {
  const ib: IconButton[] = [
    {
      label: "Inzoomen",
      variant,
      icon: "plus",
    },
    {
      label: "Uitzoomen",
      variant,
      icon: "minus",
    },
    {
      label: "Opmeten",
      variant,
      icon: "measurement",
    },
  ];

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
      label: "Button 5",
      variant,
      icon: {
        icon: "chevron-right",
      },
      iconMode: "after",
    },
  ];

  if (element === "anchor") {
    return b.map<ButtonAnchor>((button) => ({
      ...button,
      variant: button.variant || "primary",
      url: "#",
    }));
  }
  if (element === "button") {
    return b;
  }
  return ib;
}
