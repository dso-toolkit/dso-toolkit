import { h, Component, ComponentInterface, Host, Element, State, Prop, FunctionalComponent, Fragment, Method } from '@stencil/core';
import { AccordionHeading, AccordionInterface, AccordionInternalState, AccordionSectionState } from '../accordion.interfaces';

@Component({
  tag: 'dso-accordion-section',
  styleUrl: 'accordion-section.scss',
  shadow: true,
})
export class AccordionSection implements ComponentInterface {
  private accordion?: AccordionInterface;

  @Element()
  host!: HTMLElement;

  @State()
  accordionState?: AccordionInternalState;

  @Prop()
  heading: AccordionHeading = 'h2';

  /** When set the handle will render as a `<a>`. When undefined it renders as a `<button>` */
  @Prop()
  handleHref?: string;

  /** `state` takes precedence over `attachmentCount` and `icon` */
  @Prop()
  state?: AccordionSectionState;

  /** `attachmentCount` takes precedence over `icon` */
  @Prop()
  attachmentCount?: number;

  @Prop()
  icon?: string;

  @Prop()
  status?: string;

  @Prop({ reflect: true, mutable: true })
  open = false;

  @State()
  hasNestedSection = false;

  componentWillLoad() {
    const accordion = this.host.parentElement;

    if (isAccordion(accordion)) {
      this.accordion = accordion;
      accordion.getState().then(state => this.accordionState = state);
    }
  }

  componentDidLoad() {
    this.hasNestedSection = this.host.querySelector('dso-accordion') !== null;
  }

  /** Toggle a section. Pass the `<dso-accordion-section>` element or the index of the section. */
  @Method()
  async toggleSection(e?: MouseEvent): Promise<void> {
    e?.preventDefault();

    return this.accordion?.toggleSection(this.host);
  }

  render() {
    if (!this.accordionState) {
      return;
    }

    const { variant, reverseAlign } = this.accordionState;
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
          <HandleElement handleHref={this.handleHref} onClick={async (event) => await this.toggleSection(event)} open={this.open}>
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

function isAccordion(element: HTMLElement | AccordionInterface | null): element is AccordionInterface {
  return element instanceof HTMLElement && 'getState' in element;
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
      <a href={handleHref} onClick={onClick} aria-expanded={open ? 'true' : 'false'}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-expanded={open ? 'true' : 'false'}>
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