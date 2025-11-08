import { Fragment, FunctionalComponent, h } from "@stencil/core";

import {
  DocumentComponentMarkFunction,
  DocumentComponentSource,
} from "../../document-component/document-component.interfaces";
import { OzonContentMarkFunction } from "../ozon-content.interfaces";

export interface MarkTextProps {
  mark?: DocumentComponentMarkFunction | OzonContentMarkFunction;
  source?: DocumentComponentSource;
  text?: string | null;
  emitMarkItemHighlight(text: string, elementRef: HTMLElement): void;
}

export const MarkText: FunctionalComponent<MarkTextProps> = ({ mark, source, text, emitMarkItemHighlight }) => {
  if (!mark || !text) {
    return <Fragment>{text}</Fragment>;
  }

  const result = mark(text, source);

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
