import { HandlerFunction } from '@storybook/addon-actions';
import { v4 as uuidv4 } from 'uuid';

import { bindTemplate, TemplateFn, Parameters } from '@core';

export interface SelectableArgs<TemplateFnReturnType> {
  type: 'radio' | 'checkbox';
  id: string;
  name?: string;
  label: string;
  value: string;
  required?: boolean;
  invalid?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange: HandlerFunction;
  info?: TemplateFnReturnType;
  infoFixed?: boolean;
  infoActive?: boolean;
  infoClosed: HandlerFunction;
  infoToggled: HandlerFunction;
}

export interface SelectableTemplateFn<TemplateFnReturnType> extends TemplateFn<SelectableArgs<TemplateFnReturnType>, TemplateFnReturnType> {
}

export interface SelectableParameters<TemplateFnReturnType> extends Parameters<SelectableArgs<TemplateFnReturnType>, TemplateFnReturnType> {
}

export interface SelectableExtraParameters<TemplateFnReturnType> {
  info: TemplateFnReturnType;
}

export function storiesOfSelectable<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: SelectableParameters<TemplateFnReturnType>, {
  info
}: SelectableExtraParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Selectable', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        type: 'radio',
        id: uuidv4(),
        label: 'Label',
        value: 'the-value'
      },
      argTypes: {
        type: {
          options: ['radio', 'checkbox'],
          control: {
            type: 'select',
          }
        },
        id: {
          control: {
            type: 'text',
            required: true
          }
        },
        name: {
          control: {
            type: 'text'
          }
        },
        label: {
          control: {
            type: 'text'
          }
        },
        value: {
          control: 'text',
          required: true
        },
        required: {
          control: {
            type: 'boolean'
          }
        },
        invalid: {
          control: {
            type: 'boolean'
          }
        },
        checked: {
          control: {
            type: 'boolean'
          }
        },
        disabled: {
          control: {
            type: 'boolean'
          }
        },
        onChange: {
          action: 'onChange'
        },
        infoFixed: {
          control: {
            type: 'boolean'
          }
        },
        info: {
          control: {
            disable: true
          }
        },
        infoActive: {
          control: {
            type: 'boolean'
          }
        },
        infoClosed: {
          action: 'infoClosed'
        },
        infoToggled: {
          action: 'infoToggled'
        }
      }
    });

  stories.add(
    'radio',
    bindTemplate(template),
    {
      args: {
        type: 'radio'
      }
    }
  );

  stories.add(
    'checkbox',
    bindTemplate(template),
    {
      args: {
        type: 'checkbox'
      }
    }
  );

  stories.add(
    'with info',
    bindTemplate(template),
    {
      args: {
        infoFixed: false,
        info
      }
    }
  );
}
