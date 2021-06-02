export interface SelectableChangeEvent extends Event {
}

import { h, Component, Prop, Event, EventEmitter, Fragment, Element, State, forceUpdate } from '@stencil/core';
import { createIdentifier } from '../../utils/create-identifier';

@Component({
  tag: 'dso-selectable',
  styleUrl: 'selectable.scss',
  shadow: true
})
export class Selectable {
  @Prop()
  type!: 'checkbox' | 'radio';

  @Prop()
  identifier?: string;

  @Prop()
  name?: string;

  @Prop()
  value!: string;

  @Prop()
  invalid?: boolean;

  @Prop()
  describedById?: string;

  @Prop()
  disabled?: boolean;

  @Prop()
  required?: boolean;

  @Prop()
  checked?: boolean;

  @Prop()
  infoFixed?: boolean;

  @Event({
    eventName: 'dsoChange'
  })
  change!: EventEmitter<SelectableChangeEvent>;

  @Element()
  host!: HTMLElement;

  @State()
  infoActive = false;

  private mutationObserver?: MutationObserver;

  private fallbackIdentifier = createIdentifier('DsoSelectable');

  componentDidLoad() {
    this.mutationObserver?.disconnect();

    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));
    this.mutationObserver.observe(this.host, {
      childList: true
    });
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
  }

  render() {
    const hasInfo = this.host.querySelector('[slot="info"]');

    return (
      <Fragment>
        <input
          type={this.type}
          id={this.getIdentifier()}
          value={this.value}
          name={this.name}
          aria-invalid={this.invalid?.toString()}
          aria-describedby={this.describedById}
          disabled={this.disabled}
          required={this.required}
          checked={this.checked}
          onChange={e => this.change.emit(e)}
        />
        <label htmlFor={this.getIdentifier()}>
          <slot></slot>
        </label>
        {hasInfo && (
          <Fragment>
            {!this.infoFixed && (
              <dso-info-button
                active={this.infoActive}
                onToggle={e => this.infoActive = e.detail.active}
              ></dso-info-button>
            )}
            <dso-info
              fixed={this.infoFixed}
              active={this.infoActive}
              onClose={() => this.infoActive = false}
            >
              <slot name="info"></slot>
            </dso-info>
          </Fragment>
        )}
      </Fragment>
    );
  }

  private getIdentifier(): string {
    return this.identifier ?? this.fallbackIdentifier;
  }
}
