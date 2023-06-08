import { h, Component, ComponentInterface, Event, Fragment, Prop, EventEmitter, Element, State } from "@stencil/core";
import { v4 } from "uuid";
import { SlideToggleActiveEvent } from "./slide-toggle.interfaces";

@Component({
  tag: "dso-slide-toggle",
  styleUrl: "slide-toggle.scss",
  shadow: false,
})
export class SlideToggle implements ComponentInterface {
  @Element()
  private host!: HTMLElement;

  private toggleButton?: HTMLButtonElement;

  private rect?: SVGElement;

  private circle?: SVGElement;

  private drag = false;

  private colors = [
    "#999999",
    "#939694",
    "#8E938F",
    "#888F8A",
    "#828C85",
    "#7D8981",
    "#77867C",
    "#718377",
    "#6B7F72",
    "#667C6D",
    "#607968",
    "#5A7663",
    "#55735E",
    "#4F6F59",
    "#496C54",
    "#446950",
    "#3E664B",
    "#386346",
    "#325F41",
    "#2D5C3C",
    "#275937",
  ];

  @Prop()
  checked = false;

  @Prop()
  disabled = false;

  /** When provided the `<button>` will be labelled with `aria-label`. For a visible label provide a `<span>` inside the component */
  @Prop()
  accessibleLabel?: string;

  /** Provide the `id` of the element that labels this element. this property sets the `aria-labelledby` on the switch button */
  @Prop()
  labelledbyId?: string;

  @State()
  hasVisibleLabel?: boolean;

  /** Provide an `id` for the `<button>`. Useful for placing your to place your own `<label for="id">` */
  @Prop()
  identifier = v4();

  @Event()
  dsoActiveChange!: EventEmitter<SlideToggleActiveEvent>;

  private handleSwitch(e: Event, checked: boolean): void {
    this.dsoActiveChange.emit({
      originalEvent: e,
      checked,
    });
  }

  private isToggleButton(element: EventTarget | null): element is HTMLButtonElement {
    return element instanceof SVGElement && this.toggleButton?.contains(element) ? true : false;
  }

  private handleInteractionStart = (e: MouseEvent | TouchEvent) => {
    if (!this.isToggleButton(e.target)) {
      return;
    }

    this.drag = false;

    document.addEventListener("mousemove", this.handleInteractionMove);
    document.addEventListener("touchmove", this.handleInteractionMove);
  };

  private handleInteractionMove = (e: MouseEvent | TouchEvent) => {
    this.drag = true;

    if (!(this.circle instanceof SVGCircleElement) || !(this.rect instanceof SVGRectElement)) {
      return;
    }

    this.circle.style.transition = "none";
    this.rect.style.transition = "none";

    const clientX = (e instanceof TouchEvent ? e.changedTouches[0].clientX : e.clientX) - 20;

    if (clientX <= 10) {
      this.rect.style.fill = this.colors[0];
      this.circle.style.transform = "translateX(10px)";
    }

    if (clientX >= 30) {
      this.rect.style.fill = this.colors[this.colors.length - 1];
      this.circle.style.transform = "translateX(30px)";
    }

    if (clientX > 10 && clientX < 30) {
      this.rect.style.fill = this.colors[clientX - 11];
      this.circle.style.transform = `translateX(${clientX}px)`;
    }
  };

  private handleInteractionEnd = (e: MouseEvent | TouchEvent) => {
    document.removeEventListener("mousemove", this.handleInteractionMove);
    document.removeEventListener("touchmove", this.handleInteractionMove);

    if (this.drag) {
      if (!(this.circle instanceof SVGCircleElement) || !(this.rect instanceof SVGRectElement)) {
        return;
      }

      this.circle.removeAttribute("style");
      this.rect.removeAttribute("style");

      const clientX = (e instanceof TouchEvent ? e.changedTouches[0].clientX : e.clientX) - 20;

      if (clientX > 20) {
        this.handleSwitch(e, true);
      }

      if (clientX <= 20) {
        this.handleSwitch(e, false);
      }
    } else if (!this.drag && this.isToggleButton(e.target)) {
      this.handleSwitch(e, !this.checked);
    }

    this.drag = false;
  };

  componentWillLoad(): void {
    this.hasVisibleLabel = this.host.querySelector("*") !== null;
  }

  componentDidLoad(): void {
    document.addEventListener("mousedown", this.handleInteractionStart);
    document.addEventListener("touchstart", this.handleInteractionStart);
    document.addEventListener("mouseup", this.handleInteractionEnd);
    document.addEventListener("touchend", this.handleInteractionEnd);

    this.toggleButton?.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.handleSwitch(event, !this.checked);
      }
    });
  }

  disconnectedCallback(): void {
    document.removeEventListener("mousedown", this.handleInteractionStart);
    document.removeEventListener("touchstart", this.handleInteractionStart);
    document.removeEventListener("mouseup", this.handleInteractionEnd);
    document.removeEventListener("touchend", this.handleInteractionEnd);
    document.removeEventListener("mousemove", this.handleInteractionMove);
    document.removeEventListener("touchmove", this.handleInteractionMove);

    this.toggleButton?.removeEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.handleSwitch(event, !this.checked);
      }
    });
  }

  render() {
    return (
      <>
        <button
          ref={(button) => (this.toggleButton = button)}
          id={this.identifier}
          role="switch"
          class="dso-slider"
          aria-checked={"" + this.checked}
          disabled={this.disabled}
          {...(this.accessibleLabel ? { "aria-label": this.accessibleLabel } : {})}
          {...(this.labelledbyId ? { "aria-labelledby": this.labelledbyId } : {})}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 40 20">
            <g fill="none" fill-rule="evenodd">
              <rect ref={(rect) => (this.rect = rect)} width="40" height="20" fill="currentColor" rx="10" />
              <circle ref={(circle) => (this.circle = circle)} cy="10" r="8" fill="currentColor" />
            </g>
          </svg>
        </button>
        {this.hasVisibleLabel && (
          <label htmlFor={this.identifier}>
            <slot />
          </label>
        )}
      </>
    );
  }
}
