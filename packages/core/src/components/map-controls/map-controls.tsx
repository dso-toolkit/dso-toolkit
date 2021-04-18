import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'dso-map-controls',
  styleUrl: './map-controls.scss',
  shadow: true
})
export class MapControls {
  @Prop({ reflect: true })
  open = false;

  @Event()
  zoomIn!: EventEmitter<MouseEvent>;

  @Event()
  zoomOut!: EventEmitter<MouseEvent>;

  render() {
    return (
      <Host aria-hidden={this.open ? 'false' : 'true'}>
        <div class="controls">
          <button type="button" class="layers" onClick={() => this.open = !this.open}>
            Kaartlagen
          </button>
          <div class="zoom">
            <button type="button" class="zoom-in" onClick={e => this.zoomIn.emit(e)}>
              +
            </button>
            <button type="button" class="zoom-in" onClick={e => this.zoomOut.emit(e)}>
              -
            </button>
          </div>
        </div>
        <section>
          <header>
            <h2>Kaartlagen</h2>
            <button type="button" onClick={() => this.open = !this.open}>
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
