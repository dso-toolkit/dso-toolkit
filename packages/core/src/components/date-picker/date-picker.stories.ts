import { storiesOfDatePicker, DatePickerArgs, DatePickerTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import type { DsoDatePickerChangeEvent } from './date-picker';

// @ts-ignore
import readme from './readme.md';

const template: DatePickerTemplateFn<TemplateResult> = ({ id, label, onDateChange, value, min, max, disabled, showExternalButton }: DatePickerArgs) => html`
  <label for=${id}>${label}</label>
  <dso-date-picker
    @dateChange=${(e: CustomEvent<DsoDatePickerChangeEvent>) => onDateChange(e.detail)}
    identifier=${id}
    value=${ifDefined(value || undefined)}
    min=${ifDefined(min || undefined)}
    max=${ifDefined(max || undefined)}
    ?disabled=${disabled}
  ></dso-date-picker>
  ${showExternalButton
    ? html`
      <button type="button" @click=${() => (document.querySelector(`dso-date-picker[identifier="${id}"]`) as HTMLDsoDatePickerElement).show()}>
        Open
      </button>
    `
    : nothing}
`;

storiesOfDatePicker<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
