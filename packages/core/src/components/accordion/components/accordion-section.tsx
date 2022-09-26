import { h, Component, ComponentInterface, Host, Element, State, Prop } from '@stencil/core';
import { Accordion } from '../accordion';
import { AccordionState } from '../accordion.interfaces';

@Component({
  tag: 'dso-accordion-section',
  styleUrl: 'accordion-section.scss',
  shadow: true,
})
export class AccordionSection implements ComponentInterface {
  @Element()
  host!: HTMLElement;

  @Prop({ reflect: true })
  danger = false;

  @Prop({ reflect: true })
  success = false;

  @Prop({ reflect: true })
  info = false;

  @Prop({ reflect: true })
  warning = false;

  @Prop({ reflect: true, mutable: true })
  open = false;

  @State()
  state?: AccordionState;

  @State()
  hasNestedSection = false;

  componentWillLoad() {
    const parent = this.host.parentElement as unknown as Accordion;

    if (parent) {
      parent.getState().then(state => this.state = state);
    }
  }

  componentDidLoad() {
    this.hasNestedSection = this.host.querySelector('dso-accordion') !== null;
  }

  toggleSection = (e: MouseEvent) => {
    e.preventDefault();

    this.open = !this.open;
  };

  render() {
    if (!this.state) {
      return;
    }

    return (
      <Host
        class={{
          'dso-accordion-section': true,
          ['dso-accordion-' + this.state.variant]: true,
          'dso-nested-accordion': this.hasNestedSection,
        }}
      >
        <h2 class="dso-section-handle">
          {/* Overwegen om onclick op h2 te zetten en met bubbling op te vangen als target anchor of button is. */}
          <a href="#" onClick={this.toggleSection}>
            <dso-icon icon="chevron-down"></dso-icon>
            <slot name="section-handle" />
            {this.renderHandleIcon()}
          </a>
        </h2>
        <div class="dso-section-body" style={this.open ? {} : { display: 'none' }}>
          <slot />
        </div>
      </Host>
    );
  }

  renderHandleIcon() {
    if (this.danger) {
      return (<dso-icon icon="status-danger"></dso-icon>);
    }

    if (this.success) {
      return (<dso-icon icon="status-success"></dso-icon>);
    }

    if (this.info) {
      return (<dso-icon icon="status-info"></dso-icon>);
    }

    if (this.warning) {
      return (<dso-icon icon="status-warning"></dso-icon>);
    }
  }
}
