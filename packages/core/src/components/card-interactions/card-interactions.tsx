import { Component, h } from '@stencil/core';

@Component({
  tag: 'dso-card-interactions',
  styleUrl: 'card-interactions.scss',
  shadow: true
})
export class CardInteractions {
  render() {
    return (
      <div class="dso-card-interactions">
        <slot></slot>
      </div>
    )
  }
}
