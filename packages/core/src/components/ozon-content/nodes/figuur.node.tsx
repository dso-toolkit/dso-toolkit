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
    const bijschrift = childNodes.find(n => getNodeName(n) === 'Bijschrift')?.textContent;

    const illustratieNode = childNodes.find(n => getNodeName(n) === 'Illustratie');

    if (illustratieNode instanceof Element) {
      return (
        <div class="dso-ozon-figuur">
          <dso-image-overlay>
            <img
              src={illustratieNode.getAttribute('naam') ?? undefined}
              alt={titel ?? illustratieNode.getAttribute('alt') ?? illustratieNode.getAttribute('naam') ?? undefined}
              height={illustratieNode.getAttribute('hoogte') ?? undefined}
              width={illustratieNode.getAttribute('breedte') ?? undefined}
            />
          </dso-image-overlay>
          {bijschrift && (
            <span class="figuur-bijschrift">{bijschrift}</span>
          )}
        </div>
      );
    }
  }
}
