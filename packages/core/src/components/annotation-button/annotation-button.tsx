import { h, Component, ComponentInterface, Event, Prop, EventEmitter } from "@stencil/core";

export interface AnnotationButtonClickEvent {
  originalEvent: Event;
  open: boolean;
}

@Component({
  tag: "dso-annotation-button",
  styleUrl: "annotation-button.scss",
  // No shadowdom for a11y reasons (aria-controls pointing to element inside another component)
})
export class AnnotationButton implements ComponentInterface {
  /**
   * To link the Annotation Button with `aria-controls` to a different element, most likely an Annotation Output.
   */
  @Prop()
  identifier!: string | undefined;

  /**
   * Set to true when the annotation is open.
   */
  @Prop()
  open = false;

  /**
   * Emitted when user activates the button.
   */
  @Event({ bubbles: false })
  dsoClick!: EventEmitter<AnnotationButtonClickEvent>;

  private handleClick = (e: MouseEvent) => {
    this.dsoClick.emit({ originalEvent: e, open: !this.open });
  };

  render() {
    return (
      <button
        type="button"
        class="dso-tertiary"
        aria-controls={this.identifier}
        aria-expanded={this.open.toString()}
        onClick={this.handleClick}
      >
        <dso-icon icon="label"></dso-icon>
        <span class="sr-only">Toelichting bekijken</span>
      </button>
    );
  }
}
