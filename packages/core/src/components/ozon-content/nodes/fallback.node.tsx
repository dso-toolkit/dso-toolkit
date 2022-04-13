import { h } from '@stencil/core';

import { OzonContentNodeContext } from '../ozon-content-node-context.interface';
import { OzonContentNode } from '../ozon-content-node.interface';

export class OzonContentFallbackNode implements OzonContentNode {
  // This name does not match any elements
  name = ['<fallback>'];

  render(node: Node, { mapNodeToJsx }: OzonContentNodeContext) {
    return (
      <span class={`fallback od-${node instanceof Element ? node.localName : node.nodeName}`}>
        {mapNodeToJsx(node.childNodes)}
      </span>
    );
  }
}
