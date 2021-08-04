import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dso-card-interactions',
  styleUrl: 'card-interactions.scss',
  shadow: true
})
export class Card {
  @Prop()
  label!: string;

  @Prop()
  interactions: any;

  render() {
    return (
      <div class="dso-card-interactions">
        {this.interactions.map(() => (
          <dso-card-interaction label={this.label}></dso-card-interaction>
        ))}
      </div>
    );
  }
}
