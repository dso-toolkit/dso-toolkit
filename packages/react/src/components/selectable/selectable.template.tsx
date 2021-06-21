import { Selectable } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoSelectable } from '../..';
import { iconTemplate } from '../icon/icon.template';

export function selectableTemplate({
  type,
  id,
  name,
  label,
  value,
  required,
  invalid,
  describedById,
  checked,
  disabled,
  onChange,
  info
}: Selectable<TemplateResult>) {
  return (
    <DsoSelectable
      type={type}
      identifier={id || undefined}
      value={value}
      name={name}
      describedById={describedById}
      invalid={invalid}
      disabled={disabled}
      required={required}
      checked={checked}
      infoFixed={info?.fixed}
      dsoChange={(e: CustomEvent<Event>) => onChange(e.detail)}
    >
      {label}
      {info?.richContent ?? ''}
    </DsoSelectable>
  );
}
