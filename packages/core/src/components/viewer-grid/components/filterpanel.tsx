import { FunctionalComponent, h } from "@stencil/core";

import { ViewerGridFilterpanelButtons } from "./viewer-grid-filterpanel-buttons";

export interface ViewerGridFilterpanelProps {
  ref: ((elm?: HTMLDialogElement | undefined) => void) | undefined;
  filterpanelOpen: boolean;
  filterpanelSlot: HTMLElement | null;
  onApply: (mouseEvent: MouseEvent | Event) => void;
  onCancel: (mouseEvent: MouseEvent | Event) => void;
}

export const Filterpanel: FunctionalComponent<ViewerGridFilterpanelProps> = ({
  ref,
  filterpanelOpen,
  filterpanelSlot,
  onApply,
  onCancel,
}) => (
  <dialog
    id="filterpanel"
    class="filterpanel"
    hidden={!filterpanelOpen || !filterpanelSlot}
    ref={ref}
    onCancel={(e) => {
      e?.preventDefault();

      onCancel(e);
    }}
  >
    <h1>Uw keuzes</h1>
    <ViewerGridFilterpanelButtons onApply={onApply} onCancel={onCancel} />
    <slot name="filterpanel" />
    <ViewerGridFilterpanelButtons onApply={onApply} onCancel={onCancel} />
  </dialog>
);
