import { Accordion, AccordionSection } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';

import { attachmentsCounterTemplate } from '../attachments-counter/attachments-counter.template';
import { iconTemplate } from '../icon/icon.template';

const statusMap = new Map<string, string>([
  ['success', 'succes:'],
  ['info', 'info:'],
  ['warning', 'waarschuwing:'],
  ['danger', 'fout:']
]);

export function accordionHandleChildren(accordion: Accordion, section: AccordionSection) {
  return html`
    ${section.state
      ? html`<span class="sr-only">${statusMap.get(section.state)}:</span>`
      : nothing
    }

    ${section.icon && accordion.reverseAlign
      ? html`<span class="dso-icon">${iconTemplate({ icon: section.icon })}</span>`
      : nothing
    }

    ${section.handleTitle}

    ${section.icon && !accordion.reverseAlign
      ? html`<span class="dso-icon">${iconTemplate({ icon: section.icon })}</span>`
      : nothing
    }

    ${section.status
      ? html`<span class="dso-status">${section.status}</span>`
      : nothing
    }

    ${section.attachmentCount
      ? html`${attachmentsCounterTemplate({ count: section.attachmentCount })}`
      : nothing
    }
  `;
}
