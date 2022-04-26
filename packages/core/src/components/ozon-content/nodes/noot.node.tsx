import { h, Fragment } from '@stencil/core';

import { getNodeName } from '../get-node-name.function';
import { OzonContentNodeContext } from '../ozon-content-node-context.interface';
import { OzonContentNode } from '../ozon-content-node.interface';

export class OzonContentNootNode implements OzonContentNode {
  name = 'Noot';

  handles = ['NootNummer']

  identify(node: Element): string | undefined {
    return node.getAttribute("id") ?? undefined;
  }

  render(node: Element, { mapNodeToJsx, state: noteIsOpen, setState }: OzonContentNodeContext<boolean>) {
    const noteId = node.getAttribute('id');
    if (!noteId) {
      console.error('Noot node without id', node);

      return <Fragment />;
    }
  
    const noteControlsId = `dso-ozon-note-${noteId}`;
    const noteHref = `#${noteControlsId}`;

    const childNodes = Array.from(node.childNodes);
    const nootNummer = childNodes.find(n => getNodeName(n) === 'NootNummer')?.textContent ?? noteId;

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
