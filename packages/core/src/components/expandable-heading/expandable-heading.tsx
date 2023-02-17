import { Component, Fragment, h, Prop } from "@stencil/core";
import { v4 as uuidv4 } from "uuid";

import { HeadingTags } from "./expandable-heading.interfaces";
import { Heading } from "./heading";

@Component({
  tag: "dso-expandable-heading",
  styleUrl: "expandable-heading.scss",
  shadow: true,
})
export class ExpandableHeading {
  @Prop()
  open?: boolean;

  @Prop()
  heading: HeadingTags = "h2";

  @Prop()
  color: "default" | "black" = "default";

  identifier = uuidv4();

  toggle() {
    this.open = !this.open;
  }

  render() {
    const expandableProperties = this.open ? { open: true } : {};

    return (
      <Fragment>
        <div class="expandable-heading">
          <Heading heading={this.heading} className={this.color === "black" ? "dso-expandable-heading-black" : ""}>
            <button
              type="button"
              aria-expanded={this.open ? "true" : "false"}
              aria-controls={this.identifier}
              onClick={() => this.toggle()}
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
          <slot></slot>
        </dso-expandable>
      </Fragment>
    );
  }
}
