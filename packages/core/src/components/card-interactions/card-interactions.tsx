import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'dso-card-interactions',
  styleUrl: 'card-interactions.scss',
  shadow: true
})
export class CardInteractions {
  @Prop()
  interactions?: string;
  
  render() {
    return (
      <div class="dso-card-interactions">
        [dso-card-interactions.tsx]
        <slot></slot>
      </div>
    )
  }
}
