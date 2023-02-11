import { Component, ComponentInterface, Fragment, h, Prop } from "@stencil/core";
import { AnnotationService } from "../../services/annotation.service";

@Component({
  tag: "dso-annotation-button",
  styleUrl: "annotation-button.scss",
  // We disable shadowdom for a11y reasons (aria-controls pointing to element inside another component)
  shadow: false,
})
export class AnnotationButton implements ComponentInterface {
  @Prop()
  identifier!: string;

  render() {
    return (
      <Fragment>
        <button
          type="button"
          class="dso-tertiary"
          aria-controls={this.identifier}
          aria-expanded={AnnotationService.state[this.identifier]}
          onClick={() => AnnotationService.toggle(this.identifier)}
        >
          <dso-icon icon="label"></dso-icon>
        </button>
      </Fragment>
    );
  }
}
