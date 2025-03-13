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
  mark?: RenvooiRenderMarkFunction;
  emitMarkItemHighlight(text: string, elementRef: HTMLElement): void;
}

function renderText(text: string, emit: (text: string, ref: HTMLElement) => void, mark?: RenvooiRenderMarkFunction) {
  if (!mark) {
    return text;
  }

  const result = mark(text);

  if (!result) {
    return text;
  }

  return result.map((renvooiText) => {
    if (typeof renvooiText === "string") {
      return <>{renvooiText}</>;
    }

    return (
      <mark
        class={renvooiText.highlight ? "dso-highlight" : undefined}
        ref={(ref) => renvooiText.highlight && ref && emit(renvooiText.text, ref)}
      >
        {renvooiText.text}
      </mark>
    );
  });
}

const RenvooiRender: FunctionalComponent<RenvooiRenderProps> = ({ value, mark, emitMarkItemHighlight }) => {
  if (typeof value === "string" || !value) {
    // This element is used for --_dso-renvooi-text-decoration
    return <span class="text">{renderText(value, emitMarkItemHighlight, mark)}</span>;
  }

  if ("toegevoegd" in value) {
    return <ins>{renderText(value.toegevoegd, emitMarkItemHighlight, mark)}</ins>;
  }

  if ("verwijderd" in value) {
    return <del>{renderText(value.verwijderd, emitMarkItemHighlight, mark)}</del>;
  }

  return [
    <del>{renderText(value.was, emitMarkItemHighlight, mark)}</del>,
    <ins>{renderText(value.wordt, emitMarkItemHighlight, mark)}</ins>,
  ];
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
            emitMarkItemHighlight={this.handleMarkItemHighlight}
          />
        ))}
      </>
    );
  }
}
