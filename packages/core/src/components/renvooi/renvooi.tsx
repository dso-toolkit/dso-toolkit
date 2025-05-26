import { Component, ComponentInterface, Event, EventEmitter, Fragment, Prop, h } from "@stencil/core";

import { RenvooiRender } from "./renvooi-render";
import { RenvooiMarkFunction, RenvooiMarkItemHighlightEvent, RenvooiValue } from "./renvooi.interfaces";

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
            onMarkItemHighlight={this.handleMarkItemHighlight}
          />
        ))}
      </>
    );
  }
}
