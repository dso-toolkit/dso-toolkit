import { h, Component, ComponentInterface, Host, Element, State, Prop, FunctionalComponent } from '@stencil/core';
import { Accordion } from '../accordion';
import { AccordionHeading, AccordionInternalState, AccordionSectionState } from '../accordion.interfaces';

@Component({
  tag: 'dso-accordion-section',
  styleUrl: 'accordion-section.scss',
  shadow: true,
})
export class AccordionSection implements ComponentInterface {
  @Element()
  host!: HTMLElement;

  @Prop()
  state?: AccordionSectionState;

  @Prop()
  heading: AccordionHeading = 'h2';

  @Prop()
  handleHref?: string;

  @Prop({ reflect: true, mutable: true })
  open = false;

  @State()
  _state?: AccordionInternalState;

  @State()
  hasNestedSection = false;

  componentWillLoad() {
    const parent = this.host.parentElement as unknown as Accordion;

    if (parent) {
      parent.getState().then(state => this._state = state);
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
    if (!this._state) {
      return;
    }

    const { variant } = this._state;

    return (
      <Host
        class={{
          'dso-accordion-section': true,
          ['dso-accordion-' + variant]: true,
          'dso-nested-accordion': this.hasNestedSection,
        }}
      >
        <Handle heading={this.heading}>
          <HandleElement handleHref={this.handleHref} onClick={this.toggleSection} open={this.open}>
            <dso-icon icon={this.open ? 'chevron-up' : 'chevron-down'}></dso-icon>
            <slot name="section-handle" />
            {this.state && <HandleIcon status={this.state} />}
          </HandleElement>
        </Handle>
        <div class="dso-section-body" style={this.open ? {} : { display: 'none' }}>
          <slot />
        </div>
      </Host>
    );
  }
}

const HandleElement: FunctionalComponent<{
  handleHref: string | undefined,
  open: boolean;
  onClick: (e: MouseEvent) => void;
}> = ({ handleHref, onClick, open }, children) => {
  if (handleHref) {
    return (
      <a href={handleHref} onClick={onClick} aria-expanded={open}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-expanded={open}>
      {children}
    </button>
  );
};

const Handle: FunctionalComponent<{ heading: AccordionHeading; }> = ({ heading }, children) => {
  switch (heading) {
    default:
    case 'h2':
      return <h2 class="dso-section-handle">{children}</h2>;
    case 'h3':
      return <h3 class="dso-section-handle">{children}</h3>;
    case 'h4':
      return <h4 class="dso-section-handle">{children}</h4>;
    case 'h5':
      return <h5 class="dso-section-handle">{children}</h5>;
  }
};

const HandleIcon: FunctionalComponent<{ status: AccordionSectionState; }> = ({ status }) => {
  if (status === 'danger') {
    return (<dso-icon icon="status-danger"></dso-icon>);
  }

  if (status === 'success') {
    return (<dso-icon icon="status-success"></dso-icon>);
  }

  if (status === 'info') {
    return (<dso-icon icon="status-info"></dso-icon>);
  }

  if (status === 'warning') {
    return (<dso-icon icon="status-warning"></dso-icon>);
  }
};
