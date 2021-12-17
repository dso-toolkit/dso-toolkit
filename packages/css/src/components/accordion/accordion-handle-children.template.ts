import { html, nothing } from 'lit-html';

import { attachmentsCounterTemplate } from '../attachments-counter/attachments-counter.template';
import { iconTemplate } from '../icon/icon.template';

export function accordionHandleChildren(section, reverseAlign) {
  return html`
    ${section.state
      ? html`
        <span class="sr-only">
          ${ section.state === 'success' ? html `succes:` : nothing }
          ${ section.state === 'warning' ? html `waarschuwing:` : nothing }
          ${ section.state === 'danger' ? html `fout:` : nothing }
          ${ section.state === 'info' ? html `info:` : nothing }
        </span>
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
