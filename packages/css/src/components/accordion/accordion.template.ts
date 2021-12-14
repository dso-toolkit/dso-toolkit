import { Accordion } from '@dso-toolkit/sources';

import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';

function linkHandle(section) {
  return html`
    <a href="#" aria-expanded="${ifDefined(section.open ? 'true' : 'false')}">
      ${accordionHandleChildren(section)}
    </a>
  `;
}

function buttonHandle(section) {
  return html`
    <button type="button" aria-expanded="${ifDefined(section.open ? 'true' : 'false')}">
      ${accordionHandleChildren(section)}
    </button>
  `;
}

function accordionHandleChildren(section) {
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

    ${ section.title }

    ${ section.status
      ? html`<span class="dso-status">${section.status}</span>` : nothing
    }

    ${ section.attachments
      ? html`<dso-attachments-counter count="${section.attachments}"></dso-attachments-counter>` : nothing
    }
  `;
}

export function accordionTemplate({ modifiers, sections }: Accordion) {
  return html`
    <div class="dso-accordion ${classMap({ modifiers })}">
      ${sections.map(section => html`
        <div class="dso-accordion-section ${classMap({
          [`dso-${section.state}`]: !!section.state,
          'dso-open': !!section.open,
          'dso-nested-accordion': !!section.sections
        })}">

          <!-- <{{ section.header if section.header else 'h3' }} class="dso-section-handle"> -->
          <${section.header ? section.header : 'h3'}>
            ${section.type === 'link'
              ? linkHandle(section)
              : buttonHandle(section)
            }
          </${section.header ? section.header : 'h3'}>

        </div>
      `)}
    </div>
  `
}
