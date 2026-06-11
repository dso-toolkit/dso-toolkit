import { Fragment, FunctionalComponent, h } from "@stencil/core";

export interface ViewerGridFilterPanelProps {
  open: boolean;
  title?: string;
  ref: ((element: HTMLDialogElement | undefined) => void) | undefined;
  dsoCloseFilterPanel: (event: MouseEvent | Event) => void;
}

export const FilterPanel: FunctionalComponent<ViewerGridFilterPanelProps> = ({
  open,
  title,
  ref,
  dsoCloseFilterPanel,
}) => {
  const label = title || "Filterpaneel";
  return (
    <dialog class="filter-panel" ref={ref} inert={!open} aria-label={label}>
      {open && (
        <Fragment>
          <h3 class={{ "sr-only": !title }}>{label}</h3>
          <dso-icon-button
            class="dso-close"
            icon="cross"
            variant="tertiary"
            label="Sluiten"
            onDsoClick={dsoCloseFilterPanel}
          />
          <slot name="filter-panel" />
        </Fragment>
      )}
    </dialog>
  );
};
