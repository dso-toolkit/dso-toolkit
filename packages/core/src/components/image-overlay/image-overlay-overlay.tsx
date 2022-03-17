import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";
import * as focusTrap from "focus-trap";

const margin = 16;

@Component({
  tag: "dso-image-overlay-overlay",
  styleUrl: "./image-overlay-overlay.scss",
  shadow: true,
})
export class ImageOverlayOverlay {
  @Element()
  host!: HTMLElement;

  img!: HTMLImageElement;

  wrapper!: HTMLDivElement;

  trap: focusTrap.FocusTrap | undefined;

  @Prop()
  src: string | undefined;

  @Prop()
  alt: string | undefined;

  @Event()
  close!: EventEmitter<undefined>;

  onClick: (event: MouseEvent | KeyboardEvent) => void = () => {
    this.trap?.deactivate();
    this.trap = undefined;
  };

  stopPropagation: (event: MouseEvent) => void = (event) => {
    event.stopPropagation();
  };

  componentDidRender() {
    this.resizeImage();
    this.centerImage();
  }

  resizeImage() {
    const height = this.host.clientHeight - 2 * margin;
    const width = this.host.clientWidth - 2 * margin;

    const imgHeight = this.img.height;
    const imgWidth = this.img.width;

    const heightFactor = height < imgHeight ? height / imgHeight : 1;
    const widthFactor = width < imgWidth ? width / imgWidth : 1;

    const factor = Math.min(heightFactor, widthFactor);

    this.img.height = imgHeight * factor;
    this.img.width = imgWidth * factor;
  }

  centerImage() {
    const top = (this.host.clientHeight - this.img.height) / 2;
    const left = (this.host.clientWidth - this.img.width) / 2;

    this.wrapper.style.top = `${top}px`;
    this.wrapper.style.left = `${left}px`;
  }

  componentDidLoad() {
    this.trap = focusTrap.createFocusTrap(this.wrapper, {
      allowOutsideClick: true,
      onDeactivate: () => {
        this.close.emit();
      },
    });
    this.trap.activate();
  }

  disconnectedCallback() {
    this.trap?.deactivate();
  }

  render() {
    return (
      <Host onClick={this.onClick}>
        <div class="wrapper" ref={(element) => (this.wrapper = element!)}>
          <img
            src={this.src}
            alt={this.alt}
            onClick={this.stopPropagation}
            ref={(element) => (this.img = element!)}
          />
          <button
            aria-label="Sluiten"
            type="button"
            class="close"
            onClick={this.onClick}
          >
            <dso-icon icon="times"></dso-icon>
          </button>
        </div>
      </Host>
    );
  }
}
