import { Component, ComponentInterface, Element, Prop, h } from "@stencil/core";
import { clsx } from "clsx";

/**
 * @slot - The default slot for the column content.
 */
@Component({
  tag: "dso-grid-column",
  styleUrl: "grid-column.scss",
  shadow: false,
})
export class GridColumn implements ComponentInterface {
  @Element()
  host!: HTMLDsoGridColumnElement;

  /**
   * The column classes to apply (e.g. "xs-4", "md-6 lg-8"). Without "col-" prefix.
   */
  @Prop({ reflect: true })
  columns!: string;

  /**
   * When set, the column renders with a modal overlay backdrop.
   */
  @Prop({ reflect: true })
  overlay = false;

  render() {
    const columnClasses = this.columns
      .split(" ")
      .map((col) => `col-${col.trim()}`)
      .join(" ");

    return (
      <div
        class={clsx(
          "grid-column",
          { [`${columnClasses}`]: !this.overlay },
          { "grid-column-overlay col-xs-12": this.overlay },
        )}
      >
        {this.overlay && <div class="grid-column-backdrop"></div>}
        <div class="grid-column-content">
          <slot></slot>
        </div>
      </div>
    );
  }
}
