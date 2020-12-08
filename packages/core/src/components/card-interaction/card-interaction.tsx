import { Component, h } from '@stencil/core';

@Component({
  tag: 'dso-card-interaction',
  styleUrl: 'card-interaction.scss',
  shadow: true
})
export class CardInteraction {
  render() {
    return (
      <div class="dso-card-interaction">
        <slot name="interaction"></slot>
      </div>
    )
  }
}
