import { html, nothing } from 'lit-html';

import { attachmentsCounterTemplate } from '../attachments-counter/attachments-counter.template';
import { iconTemplate } from '../icon/icon.template';

const statusMap = new Map<string, string>([
  ['success', 'succes:'],
  ['info', 'info:'],
  ['warning', 'waarschuwing:'],
  ['danger', 'fout:']
]);

export function accordionHandleChildren(section, reverseAlign) {
  return html`
    ${section.state
      ? html`
        <span class="sr-only">${statusMap.get(section.state)}:</span>
      `
      : nothing
    }

    ${ section.icon && reverseAlign
      ? html`<span class="dso-icon">${iconTemplate({ icon: section.icon })}</span>` : nothing
    }

    ${ section.title }

    ${ section.icon && !reverseAlign
      ? html`<span class="dso-icon">${iconTemplate({ icon: section.icon })}</span>` : nothing
    }

    ${ section.status
      ? html`<span class="dso-status">${section.status}</span>` : nothing
    }

    ${ section.attachments
      ? html`${attachmentsCounterTemplate({ count: section.attachments })}` : nothing
    }
  `;
}
