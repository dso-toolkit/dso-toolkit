import { Fragment, FunctionalComponent, h } from "@stencil/core";
import clsx from "clsx";

import { ViewerGridMode } from "../viewer-grid.interfaces";

import { ViewerGridFilterpanelButtons } from "./viewer-grid-filterpanel-buttons";

export interface ViewerGridFilterpanelProps {
  title?: string;
  mode: ViewerGridMode;
  ref: ((element: HTMLDialogElement | undefined) => void) | undefined;
  onApply: (mouseEvent: MouseEvent) => void;
  onCancel: (event: MouseEvent | Event) => void;
  dsoCloseFilterpanel: (event: MouseEvent | Event) => void;
}

export const Filterpanel: FunctionalComponent<ViewerGridFilterpanelProps> = ({
  title,
  mode,
  ref,
  onApply,
  onCancel,
  dsoCloseFilterpanel,
}) => (
  <dialog
    id="filterpanel"
    class={clsx(`filterpanel-${mode}`, "filterpanel")}
    ref={ref}
    onCancel={(e) => {
      e.preventDefault();

      if (mode === "vrk") {
        onCancel(e);
      } else {
        dsoCloseFilterpanel(e);
      }
    }}
  >
    {mode === "vrk" ? (
      <>
        <h1>Uw keuzes</h1>
        <ViewerGridFilterpanelButtons onApply={onApply} onCancel={onCancel} />
        <slot name="filterpanel" />
        <ViewerGridFilterpanelButtons onApply={onApply} onCancel={onCancel} />
      </>
    ) : (
      <>
        {title && <h3>{title}</h3>}
        <button type="button" class="dso-close" onClick={dsoCloseFilterpanel}>
          <dso-icon icon="times"></dso-icon>
          <span class="sr-only">Sluiten</span>
        </button>
        <slot name="filterpanel" />
      </>
    )}
  </dialog>
);
