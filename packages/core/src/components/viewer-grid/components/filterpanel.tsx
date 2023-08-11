import { FunctionalComponent, h } from "@stencil/core";

import { ViewerGridFilterpanelButtons } from "./viewer-grid-filterpanel-buttons";

export interface ViewerGridFilterpanelProps {
  ref: ((elm?: HTMLDivElement | undefined) => void) | undefined;
  filterpanelOpen: boolean;
  filterpanelSlot: HTMLElement | null;
  onApply: (mouseEvent: MouseEvent) => void;
  onCancel: (mouseEvent: MouseEvent) => void;
}

export const Filterpanel: FunctionalComponent<ViewerGridFilterpanelProps> = ({
  ref,
  filterpanelOpen,
  filterpanelSlot,
  onApply,
  onCancel,
}) => (
  <div id="filterpanel" class="filterpanel" hidden={!filterpanelOpen || !filterpanelSlot} ref={ref}>
    <h1>Uw keuzes</h1>
    <ViewerGridFilterpanelButtons onApply={onApply} onCancel={onCancel} />
    <slot name="filterpanel" />
    <ViewerGridFilterpanelButtons onApply={onApply} onCancel={onCancel} />
  </div>
);
