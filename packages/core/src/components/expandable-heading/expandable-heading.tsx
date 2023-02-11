import { Component, Fragment, h, Prop } from "@stencil/core";
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
  // open = true;

  @Prop()
  heading: HeadingTags = "h2";

  @Prop()
  color: "default" | "black" = "default";

  toggle() {
    console.log("toggle");
    this.open = !this.open;
  }

  render() {
    const expandableProperties = this.open ? { open: true } : {};

    console.log("uhh", expandableProperties);

    return (
      <Fragment>
        <div class="expandable-heading">
          <Heading heading={this.heading} className={this.color === "black" ? "dso-expandable-heading-black" : ""}>
            <button type="button" onClick={() => this.toggle()}>
              <dso-icon icon={this.open ? "chevron-down" : "chevron-right"}></dso-icon>
              <slot name="title" />
            </button>
          </Heading>
          <slot name="addons-start" />
          <div class="addons-end">
            <slot name="addons-end" />
          </div>
        </div>
        <dso-expandable {...expandableProperties}>
          <slot></slot>
        </dso-expandable>
      </Fragment>
    );
  }
}
