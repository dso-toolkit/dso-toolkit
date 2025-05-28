import { Component, ComponentInterface, Fragment, Prop, h } from "@stencil/core";

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
      <>
        <div class="project-item-header">
          <div class="project-item-title">
            <slot name="title" />
            {this.label && (
              <dso-label status="danger" compact>
                {this.label}
              </dso-label>
            )}
          </div>
          <div class="project-item-actions">
            <slot name="actions" />
          </div>
        </div>
        <div class="project-item-info">
          <div class="project-item-progress">
            <slot name="progress" />
          </div>
          <div class="project-item-status">
            <slot name="status" />
          </div>
        </div>
      </>
    );
  }
}
