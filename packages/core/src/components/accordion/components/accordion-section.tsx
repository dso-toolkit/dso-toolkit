import { h, Component, ComponentInterface, Host, Element, State, Prop, FunctionalComponent, Fragment } from '@stencil/core';
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

  @State()
  _state?: AccordionInternalState;

  @Prop()
  heading: AccordionHeading = 'h2';

  @Prop()
  handleHref?: string;

  @Prop()
  state?: AccordionSectionState;

  @Prop()
  icon?: string;

  @Prop()
  attachmentCount?: number;

  @Prop()
  status?: string;

  @Prop({ reflect: true, mutable: true })
  open = false;

  @State()
  hasNestedSection = false;

  componentWillLoad() {
    const parent = this.host.parentElement as unknown as Accordion;

    if (parent instanceof HTMLElement) {
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

    const { variant, reverseAlign } = this._state;
    const hasAddons = this.status || this.state || this.icon || this.attachmentCount;

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
            {reverseAlign && (
              <Fragment>
                {hasAddons && (
                  <div class="dso-section-handle-addons">
                    <HandleIcon icon={this.icon} />
                  </div>
                )}

                <slot name="section-handle" />

                <dso-icon icon={this.open ? 'chevron-up' : 'chevron-down'}></dso-icon>
              </Fragment>
            )}
            {!reverseAlign && (
              <Fragment>
                <dso-icon icon={this.open ? 'chevron-up' : 'chevron-down'}></dso-icon>

                {this.state && <span class="sr-only">{stateMap[this.state]}</span>}

                <slot name="section-handle" />

                {hasAddons && (
                  <div class="dso-section-handle-addons">
                    {this.status && <span class="dso-status">{this.status}</span>}
                    <HandleIcon state={this.state} icon={this.icon} attachmentCount={this.attachmentCount} />
                  </div>
                )}
              </Fragment>
            )}
          </HandleElement>
        </Handle>
        <div class="dso-section-body" style={this.open ? {} : { display: 'none' }}>
          <slot />
        </div>
      </Host>
    );
  }
}

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

const HandleIcon: FunctionalComponent<{ state?: AccordionSectionState; icon?: string; attachmentCount?: number; }> = ({ state, icon, attachmentCount }) => {
  if (state) {
    return <HandleStateIcon state={state} />;
  }

  if (attachmentCount) {
    return <dso-attachments-counter count={attachmentCount}></dso-attachments-counter>;
  }

  if (icon) {
    return <dso-icon icon={icon}></dso-icon>;
  }
};

const stateMap: Record<AccordionSectionState, string> = {
  success: 'succes:',
  info: 'info:',
  warning: 'waarschuwing:',
  danger: 'fout:'
};

const HandleStateIcon: FunctionalComponent<{ state: AccordionSectionState; }> = ({ state }) => {
  if (state === 'danger') {
    return (<dso-icon icon="status-danger"></dso-icon>);
  }

  if (state === 'success') {
    return (<dso-icon icon="status-success"></dso-icon>);
  }

  if (state === 'info') {
    return (<dso-icon icon="status-info"></dso-icon>);
  }

  if (state === 'warning') {
    return (<dso-icon icon="status-warning"></dso-icon>);
  }
};
