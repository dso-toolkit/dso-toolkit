import { Interaction } from '@dso-toolkit/sources/dist/components/card/card.models';
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
        {this.interactions.map((interaction: Interaction) => (
          <dso-card-interaction label={this.label} toggle={interaction.toggle} button={interaction.button}></dso-card-interaction>
        ))}
      </div>
    );
  }
}
