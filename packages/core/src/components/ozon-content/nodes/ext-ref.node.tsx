import { h } from '@stencil/core';

import { OzonContentNodeContext } from '../ozon-content-node-context.interface';
import { OzonContentNode } from '../ozon-content-node.interface';

export class OzonContentExtRefNode implements OzonContentNode {
  name = [
    'ExtRef',
    'ExtIoRef'
  ];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={node.getAttribute('ref') ?? undefined}
      >
        <span class="sr-only">opent in nieuw venster</span>
        {mapNodeToJsx(node.childNodes)}
      </a>
    );
  }
}
