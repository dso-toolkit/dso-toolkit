import { h } from '@stencil/core';
import { getNodeName } from '../get-node-name.function';

import { OzonContentNode } from '../ozon-content-node.interface';

export class OzonContentFiguurNode implements OzonContentNode {
  name = [
    'Figuur',
  ];

  render(node: Element) {
    const childNodes = Array.from(node.childNodes);
    const titel = childNodes.find(n => getNodeName(n) === 'Titel')?.textContent;

    const illustratieNode = childNodes.find(n => getNodeName(n) === 'Illustratie');

    if (illustratieNode instanceof Element) {
      return (
        <dso-image-overlay>
          <img
            src={illustratieNode.getAttribute('naam') ?? undefined}
            alt={titel ?? illustratieNode.getAttribute('alt') ?? illustratieNode.getAttribute('naam') ?? undefined}
            height={illustratieNode.getAttribute('hoogte') ?? undefined}
            width={illustratieNode.getAttribute('breedte') ?? undefined}
          />
        </dso-image-overlay>
      );
    }
  }
}
