import { Fragment, FunctionalComponent, h } from "@stencil/core";
import { RenvooiRenderMarkFunction } from "./renvooi.interfaces";

interface RenvooiRenderTextProps {
  text: string;
  mark: RenvooiRenderMarkFunction | undefined;
  onMarkItemHighlight: (text: string, ref: HTMLElement) => void | undefined;
}

export const RenvooiRenderText: FunctionalComponent<RenvooiRenderTextProps> = ({ text, mark, onMarkItemHighlight }) => {
  if (!mark) {
    return <>{text}</>;
  }

  const result = mark(text);

  if (!result) {
    return <>{text}</>;
  }

  return (
    <>
      {result.map((renvooiText) => {
        if (typeof renvooiText === "string") {
          return <>{renvooiText}</>;
        }

        return (
          <mark
            class={renvooiText.highlight ? "dso-highlight" : undefined}
            ref={(ref) => renvooiText.highlight && ref && onMarkItemHighlight(renvooiText.text, ref)}
          >
            {renvooiText.text}
          </mark>
        );
      })}
    </>
  );
};
