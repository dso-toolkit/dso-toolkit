import { FunctionalComponent, h } from "@stencil/core";

export interface ViewerGridFilterPanelProps {
  title?: string;
  ref: ((element: HTMLDialogElement | undefined) => void) | undefined;
  dsoCloseFilterPanel: (event: MouseEvent | Event) => void;
}

export const FilterPanel: FunctionalComponent<ViewerGridFilterPanelProps> = ({ title, ref, dsoCloseFilterPanel }) => (
  <dialog class="filter-panel" ref={ref}>
    {title && <h3>{title}</h3>}
    <button type="button" class="dso-close" onClick={dsoCloseFilterPanel}>
      <dso-icon icon="times"></dso-icon>
      <span class="sr-only">Sluiten</span>
    </button>
    <slot name="filter-panel" />
  </dialog>
);
