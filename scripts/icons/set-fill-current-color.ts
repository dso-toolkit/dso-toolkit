import { XastElement } from "svgo/lib/types";

const multiColorIcons = [
  "status-success",
  "status-error",
  "status-info-solid",
  "status-warning",
  "status-warning-red-solid",
  "status-forbidden",
  "pin-outline",
  "location-orange",
  "status-warning-red-outline",
];

const grasgroen = "#39870c";

export const setFillCurrentColor = {
  name: "setFillCurrentColor",
  description: "Set the fill attribute on the path-element of all Single Color icons to currentColor.",
  fn: () => {
    let currentSVG: string;
    return {
      element: {
        enter: (node: XastElement) => {
          if (node.name === "svg") {
            currentSVG = node.attributes.id;
          }

          if (
            !multiColorIcons.includes(currentSVG) &&
            node.attributes.fill &&
            node.attributes.fill.toLowerCase() === grasgroen
          ) {
            node.attributes.fill = "currentColor";
          }
        },
      },
    };
  },
};
