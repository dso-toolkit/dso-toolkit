import { h, Fragment } from '@stencil/core';

import { OzonContentNodeContext } from '../ozon-content-node-context.interface';
import { OzonContentNode } from '../ozon-content-node.interface';

export class OzonContentNootNode implements OzonContentNode {
  name = 'Noot';

  handles = ['NootNummer']

  identify(node: Element): string | undefined {
    return node.getAttribute("id") ?? undefined;
  }

  render(node: Element, { mapNodeToJsx, state: noteIsOpen, setState }: OzonContentNodeContext<boolean>) {
    const noteId = node.getAttribute('id') ?? undefined;
    const noteControlsId = noteId && `dso-ozon-note-${noteId}`;
    const noteHref = noteId && `#${noteControlsId}`;

    const childNodes = Array.from(node.childNodes);
    const nootNummer = childNodes.find(n => n.nodeName === 'NootNummer')?.textContent;

    const onClickNote = (event: MouseEvent) => {
      event.preventDefault();

      setState?.(!noteIsOpen);
    };

    return (
      <>
        <a
          class={{ noot: true, "dso-open": !!noteIsOpen }}
          href={noteHref}
          aria-controls={noteControlsId}
          aria-expanded={noteIsOpen ? "true" : "false"}
          onClick={onClickNote}
        >
          <sup>{nootNummer}</sup>
        </a>
        <span id={noteControlsId} role="section">
          {mapNodeToJsx(Array.from(node.querySelectorAll(':scope > Al')))}
        </span>
      </>
    );
  }
}
