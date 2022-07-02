import { Component, ComponentInterface, Element, Host, State, h } from '@stencil/core';

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

  observer = new ResizeObserver(([entry]) => {
    const size = elementSizes.find(s => entry.contentRect.width >= s.width)?.alias ?? elementSizes[0].alias;

    this.sizeAlias = size;
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
