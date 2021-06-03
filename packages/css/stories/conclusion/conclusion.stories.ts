import { storiesOfConclusion, ConclusionArgs, ConclusionTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { alertTemplate } from '../alert/alert.stories';
import { infoTemplate } from '../info/info.stories';
import { infoButtonTemplate } from '../info-button/info-button.stories';

// @ts-ignore
import readme from './readme.md';

const info = html`
  <div class="dso-rich-content" slot="info">
    <p>De regels zijn erg ingewikkeld. Vraag uw gemeente Den Haag (070-1214070) of u een omgevingsvergunning moet aanvragen of een melding moet doen.</p>
  </div>
`;

const template: ConclusionTemplateFn<TemplateResult> = ({ items, alertMessage, alertStatus, info, infoFixed, infoActive, infoClosed, infoToggled }: ConclusionArgs<TemplateResult>) => html`
  <ul class="dso-conclusion">
    ${items.map(item => html`
      <li class="dso-${item.modifier}">
        ${unsafeHTML(item.label)}

        ${item.subitems && html`
          <ul>
            ${item.subitems.map(subitem => html`
              <li>${unsafeHTML(subitem)}</li>
            `)}
          </ul>
        `}

        ${info
          ? html`
            ${!infoFixed ? infoButtonTemplate({ active: infoActive, onClick: infoToggled }) : nothing}
            ${infoActive || infoFixed
              ? infoTemplate({ fixed: infoFixed, richContent: info, onClose: infoClosed })
              : nothing
            }
          `
          : nothing
        }
      </li>
    `)}
  </ul>
  ${alertMessage && alertStatus
    ? alertTemplate({ message: alertMessage, status: alertStatus })
    : nothing
  }
`;

storiesOfConclusion<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
}, {
  info
});
