import { FunctionalComponent, h } from "@stencil/core";
import { ViewerGridPanelSize, viewerGridSizeLabelMap } from "../viewer-grid.interfaces";

interface SizingButtonProp {
  className: string;
  onClick: () => void;
  label: string;
  icon: "chevron-left" | "chevron-right";
}

const SizingButton: FunctionalComponent<SizingButtonProp> = ({ className, onClick, label, icon }) => (
  <button type="button" class={className} onClick={onClick}>
    <span class="sr-only">{label}</span>
    <dso-icon icon={icon}></dso-icon>
  </button>
);

interface SizingButtonProps {
  panelLabel: string;
  size: ViewerGridPanelSize;
  expand: () => void;
  shrink: () => void;
  placement: "left" | "right";
}

export const SizingButtons: FunctionalComponent<SizingButtonProps> = ({
  shrink,
  expand,
  size,
  panelLabel,
  placement,
}) => {
  const buttons = [];

  if (size !== "small") {
    buttons.push(
      <SizingButton
        onClick={shrink}
        label={`${panelLabel} smaller maken`}
        icon={placement === "right" ? "chevron-right" : "chevron-left"}
        className="shrink"
      />,
    );
  }

  if (size !== "large") {
    buttons.push(
      <SizingButton
        onClick={expand}
        label={`${panelLabel} breder maken`}
        icon={placement === "right" ? "chevron-left" : "chevron-right"}
        className="expand"
      />,
    );
  }

  return (
    <div class="sizing-buttons">
      <span class="sr-only" aria-live="polite" aria-atomic="true">
        Breedte {panelLabel.toLocaleLowerCase()}: {viewerGridSizeLabelMap[size]}
      </span>
      {buttons}
    </div>
  );
};
