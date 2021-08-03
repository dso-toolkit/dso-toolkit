import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dso-card-interactions',
  styleUrl: 'card-interactions.scss',
  shadow: true
})
export class Card {
  @Prop()
  label: string;

  render() {
    return (
      <div class="dso-card-interactions">
        ${interactions.map((interaction: any) => html`
          <dso-card-interaction></dso-card-interaction>
        `)}
      </div>
    );
  }
}
