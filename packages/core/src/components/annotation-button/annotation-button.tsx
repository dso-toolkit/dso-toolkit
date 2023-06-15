import { Component, ComponentInterface, h, Prop } from "@stencil/core";
import { AnnotationService } from "../../services/annotation.service";

@Component({
  tag: "dso-annotation-button",
  styleUrl: "annotation-button.scss",
  // We disable shadowdom for a11y reasons (aria-controls pointing to element inside another component)
  shadow: false,
})
export class AnnotationButton implements ComponentInterface {
  /**
   * To link the Annotation Button with `aria-controls` to a different element, most likely an Annotation Output.
   */
  @Prop()
  identifier!: string;

  private annotationOutput!: HTMLDsoAnnotationOutputElement | null;

  componentDidLoad() {
    this.annotationOutput = document.querySelector(`dso-annotation-output[identifier='${this.identifier}']`);
  }

  render() {
    return (
      <button
        type="button"
        class="dso-tertiary"
        aria-controls={this.identifier}
        aria-expanded={AnnotationService.state[this.identifier] ? "true" : "false"}
        onClick={(e) => this.annotationOutput?._toggleAnnotation(e, this.identifier)}
      >
        <dso-icon icon="label"></dso-icon>
        <span class="sr-only">Toelichting bekijken</span>
      </button>
    );
  }
}
