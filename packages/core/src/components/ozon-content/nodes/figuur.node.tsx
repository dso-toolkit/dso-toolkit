import { Fragment, h } from '@stencil/core';

import { getNodeName } from '../get-node-name.function';
import { OzonContentNodeContext } from '../ozon-content-node-context.interface';
import { OzonContentNode } from '../ozon-content-node.interface';

export class OzonContentFiguurNode implements OzonContentNode {
  name = [
    'Figuur',
  ];

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    const childNodes = Array.from(node.childNodes);
    const titel = childNodes.find(n => getNodeName(n) === 'Titel')?.textContent;
    const bron = childNodes.find(n => getNodeName(n) === 'Bron')?.childNodes;

    const illustratieNode = childNodes.find(n => getNodeName(n) === 'Illustratie');
    const bijschriftNode = childNodes.find(n => getNodeName(n) === 'Bijschrift');

    if (illustratieNode instanceof Element) {
      const illustratie = {
        naam: illustratieNode.getAttribute('naam'),
        breedte: illustratieNode.getAttribute('breedte'),
        hoogte: illustratieNode.getAttribute('hoogte'),
        uitlijning: illustratieNode.getAttribute('uitlijning'),
        alt: illustratieNode.getAttribute('alt'),
        schaal: illustratieNode.getAttribute('schaal'),
      }

      const bijschrift = bijschriftNode instanceof Element ? {
        inhoud: bijschriftNode.childNodes,
        locatie: bijschriftNode.getAttribute('locatie'),
      }
      : undefined

      const bijschriftHtml = (bijschrift || bron) && (
        <span class={`figuur-bijschrift ${bijschrift?.locatie}`}>
          <em>
            {bijschrift && <Fragment>{mapNodeToJsx(bijschrift.inhoud)}</Fragment>}
            {bron && (<Fragment>{bijschrift ? ' ' : ''}(bron: {mapNodeToJsx(bron)})</Fragment>)}
          </em>
        </span>
      )

      return (
        <div class="dso-ozon-figuur">
          {titel && (
            <span class="figuur-titel">{titel}</span>
          )}
          {bijschrift?.locatie === 'boven' && bijschriftHtml}
          <dso-image-overlay>
            <img
              src={illustratie.naam ?? undefined}
              alt={illustratie.alt ?? titel ?? illustratie.naam ?? undefined}
              height={illustratie.schaal
                ? Number(illustratie.hoogte) * (Number(illustratie.schaal) / 100)
                : (illustratie.hoogte ?? undefined)}
              width={illustratie.schaal
                ? Number(illustratie.breedte) * (Number(illustratie.schaal) / 100)
                : (illustratie.breedte ?? undefined)}
            />
          </dso-image-overlay>
          {bijschrift?.locatie === 'onder' && bijschriftHtml}
        </div>
      );
    }
  }
}
