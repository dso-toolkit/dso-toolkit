import { h, Component, Event, Fragment, Prop, EventEmitter } from '@stencil/core';

@Component({
  tag: 'dso-info',
  styleUrl: './info.scss',
  shadow: true
})
export class Info {
  @Prop()
  static?: boolean;

  @Event()
  close!: EventEmitter<MouseEvent>;

  render() {
    return (
      <Fragment>
        {!this.static && (
          <button type="button" onClick={e => this.close.emit(e)}>
            <span class="sr-only">Sluiten</span>
          </button>
        )}
        <slot></slot>
      </Fragment>
    );
  }
}
