import { Component, ComponentInterface, Fragment, Prop, h } from "@stencil/core";

/**
 * @slot title - A slot to place the title of the project item in.
 * @slot actions - An optional slot to place interactive actions or buttons in.
 * @slot progress - An optional slot to place progress indicators or labels in.
 * @slot status - An optional slot to place status indicators or metadata in.
 */
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
      <Fragment>
        <div class="project-item-header">
          <div class="project-item-title">
            <slot name="title" />
            {this.label && (
              <dso-label status="error" compact>
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
      </Fragment>
    );
  }
}
