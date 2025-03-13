import {
  Component,
  ComponentInterface,
  Fragment,
  FunctionalComponent,
  Prop,
  h,
  Event,
  EventEmitter,
} from "@stencil/core";

import {
  RenvooiMarkFunction,
  RenvooiMarkItemHighlightEvent,
  RenvooiRenderMarkFunction,
  RenvooiValue,
} from "./renvooi.interfaces";

interface RenvooiRenderProps {
  value: RenvooiValue;
  mark: RenvooiRenderMarkFunction | undefined;
  onDsoMarkItemHighlight: (text: string, elementRef: HTMLElement) => void | undefined;
}

interface RenderTextProps {
  text: string;
  mark: RenvooiRenderMarkFunction | undefined;
  emitMarkItemHighlight: (text: string, ref: HTMLElement) => void | undefined;
}

const RenderText: FunctionalComponent<RenderTextProps> = ({ text, mark, emitMarkItemHighlight }) => {
  if (!mark) {
    return <>{text}</>;
  }

  const result = mark(text);

  if (!result) {
    return <>{text}</>;
  }

  return result.map((renvooiText) => {
    if (typeof renvooiText === "string") {
      return <>{renvooiText}</>;
    }

    return (
      <mark
        class={renvooiText.highlight ? "dso-highlight" : undefined}
        ref={(ref) => renvooiText.highlight && ref && emitMarkItemHighlight(renvooiText.text, ref)}
      >
        {renvooiText.text}
      </mark>
    );
  });
};

const RenvooiRender: FunctionalComponent<RenvooiRenderProps> = ({ value, mark, onDsoMarkItemHighlight }) => {
  if (typeof value === "string" || !value) {
    // This element is used for --_dso-renvooi-text-decoration
    return (
      <span class="text">
        <RenderText text={value} mark={mark} emitMarkItemHighlight={onDsoMarkItemHighlight} />
      </span>
    );
  }

  if ("toegevoegd" in value) {
    return (
      <ins>
        <RenderText text={value.toegevoegd} mark={mark} emitMarkItemHighlight={onDsoMarkItemHighlight} />
      </ins>
    );
  }

  if ("verwijderd" in value) {
    return (
      <del>
        <RenderText text={value.verwijderd} mark={mark} emitMarkItemHighlight={onDsoMarkItemHighlight} />
      </del>
    );
  }

  return (
    <>
      <del>
        <RenderText text={value.was} mark={mark} emitMarkItemHighlight={onDsoMarkItemHighlight} />
      </del>
      <ins>
        <RenderText text={value.wordt} mark={mark} emitMarkItemHighlight={onDsoMarkItemHighlight} />
      </ins>
    </>
  );
};

/**
 * Met dit component kan een `RenvooiValue` worden gepresenteerd.
 */
@Component({
  tag: "dso-renvooi",
  styleUrl: "renvooi.scss",
  shadow: true,
})
export class Renvooi implements ComponentInterface {
  /**
   * The renvooi value to render.
   */
  @Prop()
  value?: RenvooiValue | RenvooiValue[];

  /**
   * To mark text.
   */
  @Prop()
  mark?: RenvooiMarkFunction;

  /**
   * Emitted when a marked item is highlighted.
   */
  @Event({ bubbles: false })
  dsoRenvooiMarkItemHighlight!: EventEmitter<RenvooiMarkItemHighlightEvent>;

  get values(): RenvooiValue[] {
    if (!this.value) {
      return [];
    }

    return Array.isArray(this.value) ? this.value : [this.value];
  }

  private handleMarkItemHighlight = (text: string, elementRef: HTMLElement) => {
    this.dsoRenvooiMarkItemHighlight.emit({ text, elementRef });
  };

  render() {
    return (
      <>
        {this.values.map((v) => (
          <RenvooiRender
            value={v}
            mark={this.mark && ((text) => this.mark?.(text, v, this.values))}
            onDsoMarkItemHighlight={this.handleMarkItemHighlight}
          />
        ))}
      </>
    );
  }
}
