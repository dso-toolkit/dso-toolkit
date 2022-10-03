import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';

interface ElementSize {
  width: number;
  alias: string;
}

const elementSizes: ElementSize[] = [
  {
    width: 624, alias: 'large'
  },
  {
    width: 375, alias: 'medium'
  },
  {
    width: 0, alias: 'small'
  }
];

@Component({
  tag: 'dso-responsive-element',
  styleUrl: './responsive-element.scss',
  shadow: true
})
export class ResponsiveElement implements ComponentInterface {
  @State()
  sizeAlias = elementSizes[0].alias;

  @State()
  sizeWidth = 0;

  @Event()
  dsoSizeChange!: EventEmitter<string>;

  @Method()
  async getSize() {
    return this.sizeAlias;
  }

  observer = new ResizeObserver(([entry]) => {
    const size = elementSizes.find(s => entry.contentRect.width >= s.width)?.alias ?? elementSizes[0].alias;

    this.sizeAlias = size;
    this.dsoSizeChange.emit(size)
  });

  @Element()
  host!: HTMLElement;

  componentWillLoad() {
    this.observer.observe(this.host);
  }

  disconnectedCallback() {
    this.observer.unobserve(this.host);
  }

  render() {
    return (
      <Host
        small={this.sizeAlias === 'small'}
        medium={this.sizeAlias === 'medium'}
        large={this.sizeAlias === 'large'}
      >
        <slot />
      </Host>
    );
  }
}
