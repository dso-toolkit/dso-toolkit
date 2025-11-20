import React, { JSX } from "react";

export function datePickerWithLabelTemplate(datePicker: JSX.Element, id: string, label: string) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {datePicker}
    </>
  );
}
