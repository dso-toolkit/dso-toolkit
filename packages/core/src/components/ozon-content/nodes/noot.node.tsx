import { h, Fragment } from '@stencil/core';

import { getNodeName } from '../get-node-name.function';
import { OzonContentNodeContext } from '../ozon-content-node-context.interface';
import { OzonContentNode } from '../ozon-content-node.interface';

export class OzonContentNootNode implements OzonContentNode {
  name = 'Noot';

  handles = ['NootNummer']

  identify(): string | undefined {
    return 'Noot';
  }

  render(node: Element, { mapNodeToJsx, state: openNoteId, setState }: OzonContentNodeContext<string | undefined>) {
    const noteId = node.getAttribute('id');
    if (!noteId) {
      console.error('Noot node without id', node);

      return <Fragment />;
    }

    const noteControlsId = `dso-ozon-note-${noteId}`;

    const childNodes = Array.from(node.childNodes);
    const nootNummer = childNodes.find(n => getNodeName(n) === 'NootNummer')?.textContent ?? noteId;

    return (
      <>
        <sup>
          <button
            type="button"
            class="toggle-note"
            id={noteControlsId}
            aria-describedby="toggle-note-tooltip"
            onClick={() => setState?.(openNoteId === noteId ? undefined : noteId)}
            onBlur={() => setState?.(undefined)}
            aria-expanded={openNoteId === noteId ? 'true' : 'false'}
          >
            {nootNummer}
          </button>
        </sup>
        <dso-tooltip active={openNoteId === noteId} for="toggle-note-tooltip" stateless descriptive>
          <span role="section">
            {mapNodeToJsx(Array.from(node.querySelectorAll(':scope > Al')))}
          </span>
        </dso-tooltip>
      </>
    );
  }
}
