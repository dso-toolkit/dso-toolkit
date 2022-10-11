import { h } from '@stencil/core';

import { getNodeName } from '../get-node-name.function';
import { OzonContentNodeContext } from '../ozon-content-node-context.interface';
import { OzonContentNode } from '../ozon-content-node.interface';

type BijschriftProps = {
  bijschrift?: IBijschrift;
  bron?: NodeListOf<ChildNode>;
  mapNodeToJsx: (node: Node | NodeList | Node[]) => JSX.Element;
}

interface IBijschrift {
  inhoud: NodeListOf<ChildNode>;
  locatie: string;
}

const Bijschrift = ({bijschrift, bron, mapNodeToJsx}: BijschriftProps): HTMLSpanElement => {
  return (
    <span class="figuur-bijschrift">
      {bijschrift && bijschrift.inhoud && mapNodeToJsx(bijschrift.inhoud)}
      {bron && (`${bijschrift ? ' ' : ''}(bron: ${mapNodeToJsx(bron)})`)}
    </span>
  );
}

export class OzonContentFiguurNode implements OzonContentNode {
  name = [
    'Figuur',
  ];

  setImageDimensions(imageElement: HTMLImageElement, schaal: number) {
    const { naturalHeight, naturalWidth } = imageElement;

    imageElement.height = naturalHeight * (schaal / 100);
    imageElement.width = naturalWidth * (schaal / 100);
  }

  onImageLoad(event: Event, schaal?: number) {
    if(event.target instanceof HTMLImageElement && schaal) {
      this.setImageDimensions(event.target, schaal);
    }
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

      return (
        <div class={`dso-ozon-figuur ${bijschrift ? `bijschrift-${bijschrift.locatie}` : 'onder'}`}>
          {titel && (
            <span class="figuur-titel">{titel}</span>
          )}
          {bijschrift?.locatie === 'boven' && <Bijschrift bijschrift={bijschrift} bron={bron} mapNodeToJsx={mapNodeToJsx}/>}
          <dso-image-overlay>
            <div slot="titel">
              <span>{titel}</span>
            </div>
            <img
              src={illustratie.naam ?? undefined}
              alt={illustratie.alt ?? titel ?? illustratie.naam ?? undefined}
              onLoad={(event: Event) => this.onImageLoad(event, Number(illustratie.schaal))}
            />
            <div slot="bijschrift">
              <Bijschrift bijschrift={bijschrift} bron={bron} mapNodeToJsx={mapNodeToJsx}/>
            </div>
          </dso-image-overlay>
          {(bijschrift?.locatie === 'onder' || (!bijschrift && bron)) && <Bijschrift bijschrift={bijschrift} bron={bron} mapNodeToJsx={mapNodeToJsx}/>}
        </div>
      );
    }
  }
}
