import { Component, ComponentInterface, h, Prop } from "@stencil/core";

import { AnnotationService } from "../../services/annotation.service";

@Component({
  tag: "dso-annotation-output",
  styleUrl: "annotation-output.scss",
  // We disable shadowdom for a11y reasons (aria-controls being set inside another component)
  shadow: false,
})
export class AnnotationOutput implements ComponentInterface {
  @Prop()
  identifier!: string;

  componentDidLoad(): void {
    // AnnotationService.state[this.identifier];
  }

  render() {
    const expandableProperties = AnnotationService.state[this.identifier] ? { open: true } : {};

    console.log("render", AnnotationService.state[this.identifier]);
    return (
      <dso-expandable {...expandableProperties}>
        <div class="dso-annotation-header">
          <slot name="title" />
          <slot name="addons" />
          <button
            type="button"
            class="dso-tertiary dso-annotation-close-button"
            onClick={() => AnnotationService.toggle(this.identifier)}
          >
            <dso-icon icon="times"></dso-icon>
          </button>
        </div>
        <div class="dso-annotation-content">
          <slot />
        </div>
      </dso-expandable>
    );
  }
}
