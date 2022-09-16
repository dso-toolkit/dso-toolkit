import { h, Component, Event, Prop, EventEmitter, Fragment } from '@stencil/core';

@Component({
  tag: 'dso-info',
  styleUrl: './info.scss',
  shadow: true
})
export class Info {
  @Prop({ reflect: true })
  fixed?: boolean;

  @Prop({ reflect: true })
  active?: boolean;

  @Event()
  close!: EventEmitter<MouseEvent>;

  render() {
    return (
      <Fragment>
        <slot></slot>
        {!this.fixed && (
          <button type="button" onClick={e => this.close.emit(e)}>
            <span class="sr-only">Sluiten</span>
          </button>
        )}
      </Fragment>
    );
  }
}
