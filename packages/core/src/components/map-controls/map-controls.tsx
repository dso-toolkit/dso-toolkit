import { Component, h, Host, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';

const transitionDuration = 300; // Sync with $transition-duration in ./map-controls.scss

@Component({
  tag: 'dso-map-controls',
  styleUrl: './map-controls.scss',
  shadow: true
})
export class MapControls {
  @Prop({ reflect: true, mutable: true })
  open = false;

  @Prop()
  disableZoom?: 'in' | 'out' | 'both';

  @Event()
  zoomIn!: EventEmitter<MouseEvent>;

  @Event()
  zoomOut!: EventEmitter<MouseEvent>;

  @State()
  hideContent = !this.open;

  @Watch('open')
  watchOpen(open: boolean) {
    if (open) {
      this.hideContent = false;

      setTimeout(() => this.#closeButtonElement.focus(), transitionDuration);
    }
    else {
      setTimeout(() => {
        this.hideContent = true;

        this.#toggleButtonElement.focus();
      }, transitionDuration);
    }
  }

  #closeButtonElement!: HTMLButtonElement;
  #toggleButtonElement!: HTMLButtonElement;

  render() {
    return (
      <Host>
        <div class="controls">
          <button type="button" class="toggle" onClick={() => this.open = !this.open} ref={element => this.#toggleButtonElement = element!}>
            <dso-icon icon="layers"></dso-icon>
            <span>Kaartlagen</span>
          </button>
          <div class="zoom">
            <button
              type="button"
              onClick={e => this.zoomIn.emit(e)}
              disabled={this.disableZoom === 'in' || this.disableZoom === 'both'}
            >
              <dso-icon icon="plus"></dso-icon>
            </button>
            <button
              type="button"
              onClick={e => this.zoomOut.emit(e)}
              disabled={this.disableZoom === 'out' || this.disableZoom === 'both'}
            >
              <dso-icon icon="minus"></dso-icon>
            </button>
          </div>
        </div>
        <section hidden={this.hideContent}>
          <header>
            <h2>Kaartlagen</h2>
            <button type="button" class="btn-link" onClick={() => this.open = false} ref={element => this.#closeButtonElement = element!}>
              <dso-icon icon="times"></dso-icon>
            </button>
          </header>
          <div class="content">
            <slot></slot>
          </div>
        </section>
      </Host>
    );
  }
}
