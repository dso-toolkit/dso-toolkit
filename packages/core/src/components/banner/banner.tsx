import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-banner',
  styleUrl: 'banner.scss',
  shadow: true
})
export class Banner {
  @Prop()
  status!: 'warning' | 'danger';

  private static statusMap = new Map<string, string>([
    ['warning', 'Onderhoudsmelding:'],
    ['danger', 'Storingsmelding:']
  ]);

  render() {
    return (
      <section class={clsx('banner dso-banner', `alert-${this.status}`)} role="alert">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="dso-rich-content">
                <h2>{ Banner.statusMap.get(this.status) }</h2>
                <slot></slot>
              </div>
              <slot name="button"></slot>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
