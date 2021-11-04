import { EventEmitter } from '@stencil/core';
import isURL from 'validator/es/lib/isURL';

import { ContentAnchor } from './ozon-content.interfaces';

function transformDescriptionNote(body: HTMLElement): HTMLElement {
  body.querySelectorAll<HTMLDivElement>('.od-Al > div.noot').forEach((nootElement, index) => {
    const contentElement = nootElement.nextElementSibling;
    if (!(contentElement instanceof HTMLDivElement && contentElement.classList.value === 'noot_popup')) {
      return;
    }

    const nootAnchorElement = nootElement.querySelector('a');
    if (!(nootAnchorElement instanceof HTMLAnchorElement)) {
      return;
    }

    const contentAlElement = contentElement.querySelector(':scope > .od-Al');
    if (!(contentAlElement instanceof HTMLDivElement && contentAlElement.classList.value === 'od-Al')) {
      return;
    }

    nootElement.replaceWith(...Array.from(nootElement.childNodes));

    const contentWrapper = document.createElement('div');
    contentWrapper.replaceChildren(...Array.from(contentAlElement.childNodes));

    contentAlElement.replaceChildren(contentWrapper);

    contentElement.replaceWith(contentAlElement);

    const supElement = document.createElement('sup');
    supElement.replaceChildren(...Array.from(nootAnchorElement.childNodes));
    nootAnchorElement.replaceChildren(supElement);

    const id = (index + 1).toString(10);
    const [termId, contentId] = [`dso-ozon-term-${id}`, `dso-ozon-content-${id}`];

    nootAnchorElement.setAttribute('href', `#${termId}`);
    nootAnchorElement.setAttribute('id', termId);
    nootAnchorElement.setAttribute('aria-controls', contentId);
    nootAnchorElement.setAttribute('aria-expanded', 'false');

    contentAlElement?.setAttribute('id', contentId);
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

    // require_tld: false is needed to allow http://localhost
    return composedPath.slice(0, containerIndex)?.some(e => e instanceof HTMLAnchorElement && isURL(e.getAttribute('href') ?? '', { require_tld: false, require_protocol: true }));
  }

  private eventHandlers = [this.handleValidUrls, this.handleDescriptionNoteClick, this.handleContentAnchor];

  private isHostElement(value: EventTarget): boolean {
    return value instanceof HTMLElement && value.tagName === 'DSO-OZON-CONTENT';
  }
}
