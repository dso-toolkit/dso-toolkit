import { EventEmitter } from '@stencil/core';
import isURL from 'validator/es/lib/isURL';

import { ContentAnchor } from './ozon-content.interfaces';

function transformDescriptionNote(body: HTMLElement): HTMLElement {
  body.querySelectorAll<HTMLDivElement>('a.noot > div.noot_popup').forEach((e, index) => {
    const contentElement = e.querySelector('.od-Al');

    const ozonPopupElement = contentElement?.parentElement;
    const anchorElement = ozonPopupElement?.parentElement;
    const supElement = document.createElement('sup');

    supElement.replaceChildren(...Array.from(anchorElement!.childNodes));
    anchorElement?.replaceChildren(supElement);

    anchorElement?.after(contentElement!);

    ozonPopupElement?.remove();

    const id = (index + 1).toString(10);
    const [termId, contentId] = [`dso-ozon-term-${id}`, `dso-ozon-content-${id}`];

    anchorElement?.setAttribute('id', termId);
    anchorElement?.setAttribute('aria-controls', contentId);
    anchorElement?.setAttribute('aria-expanded', 'false');

    contentElement?.setAttribute('id', contentId);
  });

  return body;
}

function transformDocumentComponent(body: HTMLElement): HTMLElement {
  body.querySelectorAll('span[data-verwijst-naar-documentcomponent]').forEach(e => {
    const a = document.createElement('a');
    a.href = `#${e.getAttribute('data-verwijst-naar-documentcomponent')}`
    a.replaceChildren(...Array.from(e.childNodes));

    e.replaceWith(a);
  });

  return body;
}

const transformers = [transformDescriptionNote, transformDocumentComponent];

export class OzonContentTransformer {
  private domParser = new DOMParser();

  constructor(
    private anchorClick: EventEmitter<ContentAnchor>
  ) {
  }

  content?: HTMLCollection;

  setContent(content: string): void {
    this.content = transformers.reduce((c, t) => t(c), this.domParser.parseFromString(content, 'text/html').body).children;
  }

  handleClickEvent(event: PointerEvent): void {
    this.eventHandlers.some(h => h.bind(this)(event.composedPath(), event));
  }

  private handleDescriptionNoteClick(composedPath: EventTarget[], event: PointerEvent): boolean {
    const containerIndex = composedPath.findIndex(this.isHostElement);
    if (containerIndex === -1) {
      return false;
    }

    const anchorElement = composedPath
      .slice(0, containerIndex)
      ?.find((e): e is HTMLAnchorElement => e instanceof HTMLAnchorElement && e.classList.contains('noot'));
    if (!anchorElement) {
      return false;
    }

    event.preventDefault();

    const open = anchorElement.classList.contains('dso-open');

    if (open) {
      anchorElement.classList.remove('dso-open');
      anchorElement.setAttribute('aria-expanded', 'false');
    }
    else {
      anchorElement.classList.add('dso-open');
      anchorElement.setAttribute('aria-expanded', 'true');
    }

    return true;
  }

  private handleContentAnchor(composedPath: EventTarget[], event: PointerEvent) {
    if (composedPath.some(e => e instanceof HTMLAnchorElement)) {
      event.preventDefault();

      const anchor = composedPath.find((e): e is HTMLAnchorElement => e instanceof HTMLAnchorElement);
      const href = anchor!.href;

      this.anchorClick.emit({
        href,
        documentComponent: href.substr(href.indexOf('#') + 1),
        originalEvent: event
      });

      return true;
    }

    return false;
  }

  private handleValidUrls(composedPath: EventTarget[]): boolean {
    const containerIndex = composedPath.findIndex(this.isHostElement);
    if (containerIndex === -1) {
      return false;
    }

    return composedPath.slice(0, containerIndex)?.some(e => e instanceof HTMLAnchorElement && isURL(e.href));
  }

  private eventHandlers = [this.handleValidUrls, this.handleDescriptionNoteClick, this.handleContentAnchor];

  private isHostElement(value: EventTarget): boolean {
    return value instanceof HTMLElement && value.tagName === 'DSO-OZON-CONTENT';
  }
}
