import { Fragment, h } from '@stencil/core';

import { getNodeName } from '../get-node-name.function';
import { OzonContentNodeContext } from '../ozon-content-node-context.interface';
import { OzonContentNode } from '../ozon-content-node.interface';

export class OzonContentFiguurNode implements OzonContentNode {
  name = [
    'Figuur',
  ];

  setImageDimensions(imageElement: HTMLImageElement, schaal: number) {
    const { naturalHeight, naturalWidth } = imageElement;

    imageElement.height = naturalHeight * (schaal / 100);
    imageElement.width = naturalWidth * (schaal / 100);
  }

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
        locatie: bijschriftNode.getAttribute('locatie') ?? 'onder',
      }
      : undefined

      const bijschriftHtml: HTMLSpanElement = (bijschrift || bron) && (
        <span class={`figuur-bijschrift`}>
          {bijschrift && <Fragment>{mapNodeToJsx(bijschrift.inhoud)}</Fragment>}
          {bron && (<Fragment>{bijschrift ? ' ' : ''}(bron: {mapNodeToJsx(bron)})</Fragment>)}
        </span>
      )

      return (
        <div class={`dso-ozon-figuur ${bijschrift ? `bijschift-${bijschrift.locatie}` : ''}`}>
          {titel && (
            <span class="figuur-titel">{titel}</span>
          )}
          {bijschrift?.locatie === 'boven' && bijschriftHtml}
          <dso-image-overlay titel={titel ?? undefined} bijschrift={bijschriftHtml ?? undefined}>
            <img
              src={illustratie.naam ?? undefined}
              alt={illustratie.alt ?? titel ?? illustratie.naam ?? undefined}
              onLoad={(event: Event) => {
                if(event.target instanceof HTMLImageElement && illustratie.schaal) {
                  this.setImageDimensions(event.target, Number(illustratie.schaal));
                }
              }}
            />
          </dso-image-overlay>
          {bijschrift?.locatie === 'onder' && bijschriftHtml}
        </div>
      );
    }
  }
}
