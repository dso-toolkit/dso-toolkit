import { Component, ComponentInterface, Event, EventEmitter, h, Method, Prop } from "@stencil/core";

import { AnnotationService } from "../../services/annotation.service";
import { AnnotationToggleEvent } from "./annotation-output.interfaces";

@Component({
  tag: "dso-annotation-output",
  styleUrl: "annotation-output.scss",
  // We disable shadowdom for a11y reasons (aria-controls being set inside another component)
  shadow: false,
})
export class AnnotationOutput implements ComponentInterface {
  /** The annotation-button that toggles this component should have the same identifier. */
  @Prop()
  identifier!: string;

  /** This text will be displayed above the annotation-output when opened */
  @Prop()
  annotationPrefix?: string;

  @Event()
  dsoToggle!: EventEmitter<AnnotationToggleEvent>;

  @Method()
  async toggleAnnotation(e: MouseEvent | KeyboardEvent, identifier: string) {
    AnnotationService.toggle(identifier);

    this.dsoToggle.emit({
      originalEvent: e,
      open: AnnotationService.state[this.identifier],
    });
  }

  toggleHandler(e: MouseEvent | KeyboardEvent) {
    this.toggleAnnotation(e, this.identifier);
  }

  render() {
    const expandableProperties = AnnotationService.state[this.identifier] ? { open: true } : {};

    return (
      <dso-responsive-element>
        <dso-expandable id={this.identifier} {...expandableProperties}>
          {this.annotationPrefix && <span class="dso-annotation-prefix">{this.annotationPrefix}</span>}
          <div class="dso-annotation-header">
            <slot name="title" />
            <slot name="addons" />
            <button
              type="button"
              class="dso-tertiary dso-annotation-close-button"
              onClick={(e) => this.toggleHandler(e)}
            >
              <dso-icon icon="times"></dso-icon>
              <span class="sr-only">Toelichting sluiten</span>
            </button>
          </div>
          <div class="dso-annotation-content">
            <slot />
          </div>
        </dso-expandable>
      </dso-responsive-element>
    );
  }
}
