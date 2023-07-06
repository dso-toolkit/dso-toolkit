import { Component, Event, EventEmitter, Host, h, Prop } from "@stencil/core";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

import { EditAction, ExpandableHeadingToggleEvent, HeadingTags } from "./expandable-heading.interfaces";
import { Heading } from "./heading";

@Component({
  tag: "dso-expandable-heading",
  styleUrl: "expandable-heading.scss",
  shadow: true,
})
export class ExpandableHeading {
  /**
   * To open the Expandable Heading.
   */
  @Prop()
  open?: boolean;

  /**
   * Which heading element to use.
   */
  @Prop()
  heading: HeadingTags = "h2";

  /**
   * The color.
   */
  @Prop()
  color: "default" | "black" = "default";

  /**
   * Marks this element as unavailable.
   */
  @Prop()
  suppressed = false;

  /**
   * Whether this Expandable Heading has an edit action.
   *
   * Also known as "wijzigactie" in STOP.
   */
  @Prop()
  editAction?: EditAction;

  /**
   * Emitted when the user activates the toggle button.
   */
  @Event({ bubbles: false })
  dsoToggle!: EventEmitter<ExpandableHeadingToggleEvent>;

  private identifier = uuidv4();

  private toggle(e: MouseEvent | KeyboardEvent) {
    this.open = !this.open;

    this.dsoToggle.emit({ originalEvent: e, open: this.open });
  }

  render() {
    const expandableProperties = this.open ? { open: true } : {};

    return (
      <Host
        class={clsx({
          "dso-del": this.editAction === "delete",
          "dso-ins": this.editAction === "insert",
        })}
      >
        {this.editAction === "delete" && (
          <p class="dso-edit-action-text">
            <span>verwijderd:</span>
          </p>
        )}
        {this.editAction === "insert" && (
          <p class="dso-edit-action-text">
            <span>toegevoegd:</span>
          </p>
        )}
        <div class={clsx("expandable-heading", this.color === "black" ? "dso-expandable-heading-black" : "")}>
          <Heading heading={this.heading}>
            <button
              type="button"
              aria-expanded={this.open ? "true" : "false"}
              aria-controls={this.identifier}
              onClick={(e) => this.toggle(e)}
            >
              <dso-icon icon={this.open ? "chevron-down" : "chevron-right"}></dso-icon>
              <slot name="title" />
            </button>
          </Heading>
          <slot name="addons-start" />
          <div class="addons-end">
            <slot name="addons-end" />
          </div>
        </div>
        <dso-expandable id={this.identifier} {...expandableProperties}>
          <slot />
        </dso-expandable>
      </Host>
    );
  }
}
