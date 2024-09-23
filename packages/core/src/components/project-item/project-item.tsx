import { Component, ComponentInterface, h, Prop } from "@stencil/core";

// import {  } from "./project-item.interfaces";

@Component({
  tag: "dso-project-item",
  styleUrl: "project-item.scss",
  shadow: true,
})
export class ProjectItem implements ComponentInterface {
  /**
   * The label of the project item.
   */
  @Prop()
  label?: string;

  render() {
    return (
      <div>
        <slot name="title" />
        {this.label && (
          <dso-label status="danger" compact>
            {this.label}
          </dso-label>
        )}
        <slot name="actions" />
        <slot name="progress" />
        <slot name="status" />
      </div>
    );
  }
}
