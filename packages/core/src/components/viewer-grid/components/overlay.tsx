import { FunctionalComponent, h } from "@stencil/core";

export interface ViewerGridOverlayProps {
  ref: ((element: HTMLDialogElement | undefined) => void) | undefined;
  dsoCloseOverlay: (event: MouseEvent | Event) => void;
}

export const Overlay: FunctionalComponent<ViewerGridOverlayProps> = ({ ref, dsoCloseOverlay }) => (
  <dialog
    class="overlay"
    ref={ref}
    onCancel={(e) => {
      e.preventDefault();

      dsoCloseOverlay(e);
    }}
  >
    <dso-icon-button
      class="overlay-close-button"
      icon="times"
      variant="tertiary"
      accessibleLabel="Sluiten"
      onClick={dsoCloseOverlay}
    />
    <slot name="overlay" />
  </dialog>
);
