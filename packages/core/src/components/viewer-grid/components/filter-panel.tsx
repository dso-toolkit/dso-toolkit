import { FunctionalComponent, h } from "@stencil/core";

export interface ViewerGridFilterPanelProps {
  title?: string;
  ref: ((element: HTMLDialogElement | undefined) => void) | undefined;
  dsoCloseFilterPanel: (event: MouseEvent | Event) => void;
}

export const FilterPanel: FunctionalComponent<ViewerGridFilterPanelProps> = ({ title, ref, dsoCloseFilterPanel }) => (
  <dialog class="filter-panel" ref={ref}>
    {title && <h3>{title}</h3>}
    <dso-icon-button
      class="dso-close"
      icon="times"
      variant="tertiary"
      accessibleLabel="Sluiten"
      onClick={dsoCloseFilterPanel}
    />
    <slot name="filter-panel" />
  </dialog>
);
