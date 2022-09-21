import { Selectable } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoSelectable } from '../..';

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
  indeterminate,
  disabled,
  onChange,
  info
}: Selectable<JSX.Element>) {
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
      indeterminate={indeterminate}
      infoFixed={info?.fixed}
      onDsoChange={(e: CustomEvent<Event>) => onChange?.(e.detail)}
    >
      {label}
      {info?.richContent ?? ''}
    </DsoSelectable>
  );
}
