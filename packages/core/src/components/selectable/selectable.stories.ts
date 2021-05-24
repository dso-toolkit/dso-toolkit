import { storiesOfSelectable, SelectableArgs, SelectableTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

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
  infoFixed
}: SelectableArgs<TemplateResult>) => html`
  <dso-selectable
    type=${type}
    identifier=${id}
    value=${value}
    name=${ifDefined(name)}
    @dsoChange=${(e: CustomEvent<Event>) => onChange(e.detail)}
    ?invalid=${invalid}
    ?disabled=${disabled}
    ?required=${required}
    ?checked=${checked}
    ?info-fixed=${infoFixed}
  >
    ${label}
    ${info ?? nothing}
  </dso-selectable>
`;

storiesOfSelectable({
  module,
  storiesOf,
  readme,
  template
}, {
  info
});
