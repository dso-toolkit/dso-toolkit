import { FunctionalComponent, h } from "@stencil/core";

import { ViewerGridFilterpanelButtons } from "./viewer-grid-filterpanel-buttons";

export interface ViewerGridFilterpanelProps {
  ref: ((element: HTMLDialogElement | undefined) => void) | undefined;
  onApply: (mouseEvent: MouseEvent) => void;
  onCancel: (event: MouseEvent | Event) => void;
}

export const Filterpanel: FunctionalComponent<ViewerGridFilterpanelProps> = ({ ref, onApply, onCancel }) => (
  <dialog
    id="filterpanel"
    class="filterpanel"
    ref={ref}
    onCancel={(e) => {
      e.preventDefault();

      onCancel(e);
    }}
  >
    <h1>Uw keuzes</h1>
    <ViewerGridFilterpanelButtons onApply={onApply} onCancel={onCancel} />
    <slot name="filterpanel" />
    <ViewerGridFilterpanelButtons onApply={onApply} onCancel={onCancel} />
  </dialog>
);
