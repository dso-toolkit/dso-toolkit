import { Component, Prop, h, getAssetPath } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-icon',
  styleUrl: './icon.scss',
  assetsDirs: ['icon-assets'],
  shadow: true
})
export class Icon {
  @Prop()
  icon!: string;

  render() {
    return (
      <svg class={clsx('di', this.icon)}>
        <use href={`${getAssetPath('./icon-assets/dso-icons.svg')}#${this.icon}`} />
      </svg>
    );
  }
}
