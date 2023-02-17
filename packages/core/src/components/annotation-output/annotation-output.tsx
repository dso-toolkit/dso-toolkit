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
  @Prop()
  identifier!: string;

  @Event()
  dsoToggleAnnotation!: EventEmitter<AnnotationToggleEvent>;

  @Method()
  async toggleAnnotation(e: MouseEvent, identifier: string) {
    AnnotationService.toggle(identifier);

    this.dsoToggleAnnotation.emit({
      originalEvent: e,
      open: AnnotationService.state[this.identifier],
    });
  }

  toggleHandler(e: MouseEvent) {
    this.toggleAnnotation(e, this.identifier);
  }

  render() {
    const expandableProperties = AnnotationService.state[this.identifier] ? { open: true } : {};

    return (
      <dso-expandable id={this.identifier} {...expandableProperties}>
        <div class="dso-annotation-header">
          <slot name="title" />
          <slot name="addons" />
          <button type="button" class="dso-tertiary dso-annotation-close-button" onClick={(e) => this.toggleHandler(e)}>
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">Toelichting sluiten</span>
          </button>
        </div>
        <div class="dso-annotation-content">
          <slot />
        </div>
      </dso-expandable>
    );
  }
}
