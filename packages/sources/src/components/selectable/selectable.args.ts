import { ArgTypes } from '../../stories-helpers';
import { HandlerFunction } from '@storybook/addon-actions';
import { Selectable } from './selectable.models';

export interface SelectableArgs<TemplateFnReturnType> {
  type: 'radio' | 'checkbox';
  id: string;
  name?: string;
  label: string;
  value: string;
  required?: boolean;
  invalid?: boolean;
  describedById?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: HandlerFunction;
  info?: TemplateFnReturnType;
  infoFixed?: boolean;
  infoActive?: boolean;
  infoClosed: HandlerFunction;
  infoToggled: HandlerFunction;
}

export const selectableArgTypes: ArgTypes<SelectableArgs<unknown>> = {
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
  describedById: {
    control: {
      type: 'text'
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
};

export function selectableArgsMapper(a: SelectableArgs<any>): Selectable<any> {
  return {
    id: a.id,
    label: a.label,
    onChange: e => a.onChange(e),
    type: a.type,
    value: a.value,
    checked: a.checked,
    describedById: a.describedById,
    disabled: a.disabled,
    info: a.info
      ? {
        onClose: e => a.infoClosed(e),
        richContent: a.info,
        active: a.infoActive,
        fixed: a.infoFixed
      }
      : undefined,
    invalid: a.invalid,
    name: a.name,
    required: a.required
  };
}
