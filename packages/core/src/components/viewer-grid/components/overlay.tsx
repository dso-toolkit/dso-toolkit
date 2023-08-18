import { FunctionalComponent, h } from "@stencil/core";

export interface ViewerGridOverlayProps {
  ref: ((elm?: HTMLDialogElement | undefined) => void) | undefined;
  dsoCloseOverlay: (mouseEvent: MouseEvent | Event) => void;
}

export const Overlay: FunctionalComponent<ViewerGridOverlayProps> = ({ ref, dsoCloseOverlay }) => (
  <dialog
    class="overlay"
    ref={ref}
    onCancel={(e) => {
      e?.preventDefault();

      dsoCloseOverlay(e);
    }}
  >
    <button type="button" class="overlay-close-button" onClick={dsoCloseOverlay}>
      <dso-icon icon="times"></dso-icon>
      <span class="sr-only">sluiten</span>
    </button>
    <slot name="overlay" />
    {/* This button is needed for the `focus-trap` library to function correctly. It is never focused. */}
    <button aria-hidden="true" type="button" class="overlay-close-button" style={{ zIndex: "-100" }}>
      <dso-icon icon="times"></dso-icon>
      <span class="sr-only">sluiten</span>
    </button>
  </dialog>
);
