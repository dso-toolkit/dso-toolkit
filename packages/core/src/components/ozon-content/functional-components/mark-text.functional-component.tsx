import { Fragment, FunctionalComponent, h } from "@stencil/core";

import { OzonContentMarkFunction } from "../ozon-content.interfaces";

export interface MarkTextProps {
  mark: OzonContentMarkFunction;
  text: string;
  emitMarkItemHighlight(text: string, elementRef: HTMLElement): void;
}

export const MarkText: FunctionalComponent<MarkTextProps> = ({ mark, text, emitMarkItemHighlight }) => {
  const result = mark(text);

  return !result || result.length === 0 ? (
    <Fragment>{text}</Fragment>
  ) : (
    <Fragment>
      {result.map((value) => {
        if (typeof value === "string") {
          return <Fragment>{value}</Fragment>;
        }

        return (
          <mark
            class={value.highlight ? "dso-highlight" : undefined}
            ref={(ref) => value.highlight && ref && emitMarkItemHighlight(value.text, ref)}
          >
            {value.text}
          </mark>
        );
      })}
    </Fragment>
  );
};
