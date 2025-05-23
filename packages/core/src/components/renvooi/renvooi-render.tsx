import { Fragment, FunctionalComponent, h } from "@stencil/core";

import { RenvooiRenderText } from "./renvooi-render-text";
import { RenvooiRenderMarkFunction, RenvooiValue } from "./renvooi.interfaces";

interface RenvooiRenderProps {
  value: RenvooiValue;
  mark: RenvooiRenderMarkFunction | undefined;
  onMarkItemHighlight: (text: string, elementRef: HTMLElement) => void | undefined;
}

export const RenvooiRender: FunctionalComponent<RenvooiRenderProps> = ({ value, mark, onMarkItemHighlight }) => {
  if (typeof value === "string" || !value) {
    // This element is used for --_dso-renvooi-text-decoration
    return (
      <span class="text">
        <RenvooiRenderText text={value} mark={mark} onMarkItemHighlight={onMarkItemHighlight} />
      </span>
    );
  }

  if ("toegevoegd" in value) {
    return (
      <ins>
        <RenvooiRenderText text={value.toegevoegd} mark={mark} onMarkItemHighlight={onMarkItemHighlight} />
      </ins>
    );
  }

  if ("verwijderd" in value) {
    return (
      <del>
        <RenvooiRenderText text={value.verwijderd} mark={mark} onMarkItemHighlight={onMarkItemHighlight} />
      </del>
    );
  }

  return (
    <>
      <del>
        <RenvooiRenderText text={value.was} mark={mark} onMarkItemHighlight={onMarkItemHighlight} />
      </del>
      <ins>
        <RenvooiRenderText text={value.wordt} mark={mark} onMarkItemHighlight={onMarkItemHighlight} />
      </ins>
    </>
  );
};
