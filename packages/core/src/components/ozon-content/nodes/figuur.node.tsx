import { Fragment, h } from '@stencil/core';

import { getNodeName } from '../get-node-name.function';
import { OzonContentNodeContext } from '../ozon-content-node-context.interface';
import { OzonContentNode } from '../ozon-content-node.interface';

type BijschriftProps = {
  bijschrift?: IBijschrift;
  mapNodeToJsx: (node: Node | NodeList | Node[]) => JSX.Element;
}

export interface IBijschrift {
  inhoud: NodeListOf<ChildNode>;
  locatie: string;
  bron?: NodeListOf<ChildNode>;
}

export const Bijschrift = ({bijschrift, mapNodeToJsx}: BijschriftProps): JSX.Element => {
  return bijschrift && (
          <span class={`figuur-bijschrift`}>
            {bijschrift.inhoud && <Fragment>{mapNodeToJsx(bijschrift.inhoud)}</Fragment>}
            {bijschrift.bron && (<Fragment>{bijschrift ? ' ' : ''}(bron: {mapNodeToJsx(bijschrift.bron)})</Fragment>)}
          </span>
        )
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
        bron: childNodes.find(n => getNodeName(n) === 'Bron')?.childNodes,
      }
      : undefined

      return (
        <div class={`dso-ozon-figuur ${bijschrift ? `bijschift-${bijschrift.locatie}` : ''}`}>
          {titel && (
            <span class="figuur-titel">{titel}</span>
          )}
          {bijschrift?.locatie === 'boven' && <Bijschrift bijschrift={bijschrift} mapNodeToJsx={mapNodeToJsx}/>}
          <dso-image-overlay titel={titel ?? undefined} bijschrift={Bijschrift({bijschrift, mapNodeToJsx}) ?? undefined}>
            <img
              src={illustratie.naam ?? undefined}
              alt={illustratie.alt ?? titel ?? illustratie.naam ?? undefined}
              onLoad={(event: Event) => this.onImageLoad(event, Number(illustratie.schaal))}
            />
          </dso-image-overlay>
          {bijschrift?.locatie === 'onder' && <Bijschrift bijschrift={bijschrift} mapNodeToJsx={mapNodeToJsx}/>}
        </div>
      );
    }
  }
}
