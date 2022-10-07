import { Footnote } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ComponentImplementation } from '../../templates';

export const cssFootnote: ComponentImplementation<Footnote> = {
  component: 'footnote',
  implementation: 'css',
  template: () => function footnotesReferenceTemplate({ number }: Footnote) {
    return html`
      <sup id="#voetnoot-${number}-link" class="dso-footnote-reference"><a href="#voetnoot-${number}">[${number}]</a></sup>
    `;
  }
}

