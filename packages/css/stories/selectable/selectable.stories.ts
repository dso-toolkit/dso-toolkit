import { storiesOfSelectable, SelectableArgs, SelectableTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { infoTemplate } from '../info/info.stories';
import { infoButtonTemplate } from '../info-button/info-button.stories';

// @ts-ignore
import readme from './readme.md';

const info = html`
  <div class="dso-rich-content" slot="info">
    <p>Rijke inhoud</p>
    <p>Ziet er zo uit</p>
    <ul>
      <li>Lijstjes</li>
    </ul>
    <p>Kan allemaal</p>
  </div>
`;

const template: SelectableTemplateFn<TemplateResult> = ({
  type,
  id,
  name,
  label,
  value,
  required,
  invalid,
  checked,
  disabled,
  onChange,
  info,
  infoFixed,
  infoActive,
  infoClosed,
  infoToggled
}: SelectableArgs<TemplateResult>) => html`
  <div class="dso-selectable">
    <input
      type=${type}
      id=${id}
      value=${value}
      name=${ifDefined(name)}
      aria-invalid=${ifDefined(invalid)}
      @change=${(e: Event) => onChange(e)}
      ?disabled=${disabled}
      ?required=${required}
      ?checked=${checked}
    >
    <label for=${id}>
      ${label}
    </label>
    ${info
      ? html`
        ${!infoFixed ? infoButtonTemplate({ active: infoActive, label: 'x', onClick: infoToggled }) : nothing}
        ${infoActive || infoFixed
          ? infoTemplate({ fixed: infoFixed, richContent: info, onClose: infoClosed })
          : nothing
        }
      `
      : nothing
    }
  </div>
`;

storiesOfSelectable({
  module,
  storiesOf,
  readme,
  template
}, {
  info
});
