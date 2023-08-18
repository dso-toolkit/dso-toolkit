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
    <button type="button" class="overlay-close-button" onClick={dsoCloseOverlay}>
      <dso-icon icon="times"></dso-icon>
      <span class="sr-only">sluiten</span>
    </button>
    <slot name="overlay" />
  </dialog>
);
