export interface SelectableChangeEvent extends Event {
}

import { h, Component, Prop, Event, EventEmitter, Fragment, Element, State, forceUpdate, Watch } from '@stencil/core';
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
  indeterminate?: boolean;

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

  private input: HTMLInputElement | undefined;

  componentDidLoad() {
    this.mutationObserver?.disconnect();

    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));
    this.mutationObserver.observe(this.host, {
      childList: true
    });

    this.setIndeterminate();
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
  }

  @Watch('indeterminate')
  setIndeterminate() {
    if (!(this.input instanceof HTMLInputElement) || this.type != 'checkbox') {
      return;
    }

    this.input.indeterminate = !!this.indeterminate;
  }

  render() {
    const hasInfo = !!this.host.querySelector('[slot="info"]');

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
          ref={(el) => this.input = el}
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
