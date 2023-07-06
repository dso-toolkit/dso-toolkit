import { h, Component, ComponentInterface, Event, EventEmitter, Host, Prop } from "@stencil/core";

export interface AnnotationOutputCloseEvent {
  originalEvent: Event;
}

@Component({
  tag: "dso-annotation-output",
  styleUrl: "annotation-output.scss",
  // No shadowdom for a11y reasons (aria-controls being set inside another component)
})
export class AnnotationOutput implements ComponentInterface {
  /**
   * The annotation-button that toggles this component should have the same identifier.
   */
  @Prop({ reflect: true })
  identifier!: string;

  /**
   * This text will be displayed above the annotation-output when opened
   */
  @Prop({ reflect: true })
  annotationPrefix?: string;

  /**
   * Set to `true` to show content.
   */
  @Prop({ reflect: true })
  open = false;

  /**
   * This event is emitted when the user activates the Annotation Button.
   */
  @Event({ bubbles: false })
  dsoClose!: EventEmitter<AnnotationOutputCloseEvent>;

  private toggleHandler = (e: MouseEvent) => {
    this.dsoClose.emit({ originalEvent: e });
  };

  render() {
    return (
      <Host id={this.identifier}>
        <dso-responsive-element>
          <dso-expandable open={this.open}>
            {this.annotationPrefix && <span class="dso-annotation-prefix">{this.annotationPrefix}</span>}
            <div class="dso-annotation-header">
              <slot name="title" />
              <slot name="addons" />
              <button type="button" class="dso-tertiary dso-annotation-close-button" onClick={this.toggleHandler}>
                <dso-icon icon="times"></dso-icon>
                <span class="sr-only">Toelichting sluiten</span>
              </button>
            </div>
            <div class="dso-annotation-content">
              <slot />
            </div>
          </dso-expandable>
        </dso-responsive-element>
      </Host>
    );
  }
}
