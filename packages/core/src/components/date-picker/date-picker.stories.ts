import { storiesOfDatePicker } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
// import { html, nothing } from 'lit-html';

import { datePickerTemplate } from './date-picker.template';
import readme from './readme.md';

// const template = ({ id, label, onDateChange, value, min, max, disabled, showExternalButton }: any) => html`
//   <label for=${id}>${label}</label>
//   ${datePickerTemplate({ id, disabled, onDateChange, max, min, value })}
//   ${showExternalButton
//     ? html`
//       <button type="button" @click=${() => document.querySelector<HTMLDsoDatePickerElement>(`dso-date-picker[identifier="${id}"]`)?.show()}>
//         Open
//       </button>
//     `
//     : nothing
//   }
// `;

storiesOfDatePicker(
  {
    module,
    storiesOf,
    readme
  },
  {
    datePickerTemplate
  }
);
