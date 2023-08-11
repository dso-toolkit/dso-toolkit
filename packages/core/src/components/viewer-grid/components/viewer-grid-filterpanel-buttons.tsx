import { FunctionalComponent, h } from "@stencil/core";

export interface ViewerGridFilterpanelButtonsProps {
  onApply: (mouseEvent: MouseEvent) => void;
  onCancel: (mouseEvent: MouseEvent) => void;
}

export const ViewerGridFilterpanelButtons: FunctionalComponent<ViewerGridFilterpanelButtonsProps> = ({
  onApply,
  onCancel,
}) => (
  <div class="filterpanel-buttons">
    <button type="button" class="cancel-button" onClick={onCancel}>
      <span>Annuleren</span>
    </button>
    <button type="button" class="apply-button" onClick={onApply}>
      <span>Toepassen</span>
      <dso-icon icon="chevron-right"></dso-icon>
    </button>
  </div>
);
