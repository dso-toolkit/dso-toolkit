import { FunctionalComponent, h } from "@stencil/core";

export interface ViewerGridFilterpanelProps {
  title?: string;
  ref: ((element: HTMLDialogElement | undefined) => void) | undefined;
  dsoCloseFilterpanel: (event: MouseEvent | Event) => void;
}

export const Filterpanel: FunctionalComponent<ViewerGridFilterpanelProps> = ({ title, ref, dsoCloseFilterpanel }) => (
  <dialog id="filterpanel" class="filterpanel-vdk filterpanel" ref={ref}>
    {title && <h3>{title}</h3>}
    <button type="button" class="dso-close" onClick={dsoCloseFilterpanel}>
      <dso-icon icon="times"></dso-icon>
      <span class="sr-only">Sluiten</span>
    </button>
    <slot name="filterpanel" />
  </dialog>
);
