import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dso-card-interaction',
  styleUrl: 'card-interaction.scss',
  shadow: true
})
export class Card {
  @Prop()
  toggle: string;

  @Prop()
  button: string;

  @Prop()
  label: string;

  render() {
    return (
      <div class="dso-card-interaction">
        {this.toggle && (
          <label>
            <input type="checkbox" name={this.toggle.id} />
            <span class="sr-only">{this.label}</span>
          </label>
        )}
        Button
      </div>
    );
  }
}
