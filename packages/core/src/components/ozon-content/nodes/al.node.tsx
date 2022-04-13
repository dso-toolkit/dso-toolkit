import { h } from '@stencil/core';

import { OzonContentNodeContext } from '../ozon-content-node-context.interface';
import { OzonContentNode } from '../ozon-content-node.interface';

export class OzonContentAlNode implements OzonContentNode {
  name = 'Al';

  render(node: Element, { mapNodeToJsx, path }: OzonContentNodeContext) {
    const nestedAl = path.some(node => node.nodeName === 'Al');
    const content = mapNodeToJsx(node.childNodes);

    return nestedAl
      ? <span role="paragraph">{content}</span>
      : <p>{content}</p>;
  }
}
