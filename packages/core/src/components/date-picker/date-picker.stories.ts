import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { v1 as uuidv4 } from 'uuid';

import { DsoDatePickerChangeEvent } from './date-picker';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ id, label, onDateChange, value, min, max, disabled, showExternalButton }: any) => html`
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

const stories = storiesOf('Date Picker', module)
  .addParameters({
    docs: {
      page: readme
    },
    args: {
      label: 'Datum',
      disabled: false,
      showExternalButton: false
    },
    argTypes: {
      value: {
        control: {
          type: 'text'
        }
      },
      min: {
        control: {
          type: 'text'
        }
      },
      max: {
        control: {
          type: 'text'
        }
      },
      onDateChange: {
        action: 'date changed'
      }
    }
  });

stories.add(
  'default',
  template,
  {
    args: {
      id: uuidv4()
    }
  }
);

stories.add(
  'disabled',
  template,
  {
    args: {
      id: uuidv4(),
      disabled: true
    }
  }
);

stories.add(
  'with value',
  template,
  {
    args: {
      id: uuidv4(),
      value: '15-11-2020'
    }
  }
);

stories.add(
  'with min and max',
  template,
  {
    args: {
      id: uuidv4(),
      min: '3-1-2020',
      max: '28-1-2020'
    }
  }
);
