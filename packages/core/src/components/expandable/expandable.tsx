import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  State,
  Watch,
  h,
} from "@stencil/core";
import { clsx } from "clsx";

export interface ExpandableAnimationStartEvent {
  currentOpen: boolean;
  nextOpen: boolean;
}

export interface ExpandableAnimationEndEvent {
  bodyHeight: number | undefined;
  open: boolean;
}

@Component({
  tag: "dso-expandable",
  styleUrl: "expandable.scss",
  shadow: true,
})
export class Expandable implements ComponentInterface {
  private bodyHeight?: number;

  @Element()
  host!: HTMLDsoExpandableElement;

  /**
   * Set to `true` to expand the content.
   */
  @Prop({ reflect: true })
  open?: boolean;

  /**
   * Set to `true` to show the content animated.
   */
  @Prop({ reflect: true })
  enableAnimation = false;

  /**
   * When enableAnimation is set to `true`, this property specifies the height of this element at which the animation will expand from / collapse to
   */
  @Prop()
  minimumHeight?: number;

  @Watch("open")
  toggleOpen() {
    if (!this.enableAnimation) {
      this.isClosed = !this.open;
    }
  }

  @State()
  isClosed = true;

  /**
   * Fired before expanding.
   */
  @Event({ bubbles: false })
  dsoExpandableAnimationStart!: EventEmitter<ExpandableAnimationStartEvent>;

  /**
   * Fired after expanding.
   */
  @Event({ bubbles: false })
  dsoExpandableAnimationEnd!: EventEmitter<ExpandableAnimationEndEvent>;

  /**
   * Listens to the transitionstart event
   */
  @Listen("transitionstart")
  transitionstartHandler(e: TransitionEvent) {
    e.stopPropagation();

    if (e.propertyName === "grid-template-rows") {
      this.dsoExpandableAnimationStart.emit({
        currentOpen: !!this.open,
        nextOpen: !this.open,
      });
    }
  }

  /**
   * Listens to the transitionend event
   */
  @Listen("transitionend")
  transitionendHandler(e: TransitionEvent) {
    e.stopPropagation();

    if (e.propertyName === "grid-template-rows") {
      this.isClosed = !this.open;
      this.dsoExpandableAnimationEnd.emit({ bodyHeight: this.bodyHeight, open: !!this.open });
    }
  }

  render() {
    return (
      <Host
        aria-hidden={this.open ? "false" : "true"}
        class={clsx({
          "dso-animate-ready": this.enableAnimation,
          "dso-hide": this.isClosed,
        })}
      >
        <div class="slot-container">
          <slot />
        </div>
      </Host>
    );
  }
}
