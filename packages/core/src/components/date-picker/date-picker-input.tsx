import { h, FunctionalComponent } from "@stencil/core"
import { DuetLocalizedText } from "./date-localization"

type DatePickerInputProps = {
  formattedValue: string
  localization: DuetLocalizedText
  disabled: boolean
  onClick: (event: MouseEvent) => void
  buttonRef: (element: HTMLButtonElement) => void
}

export const DatePickerInput: FunctionalComponent<DatePickerInputProps> = ({
  onClick,
  localization,
  formattedValue,
  disabled,
  buttonRef,
}) => {
  return (
    <div class="duet-date__input-wrapper">
      <slot />
      <button class="duet-date__toggle" onClick={onClick} disabled={disabled} ref={buttonRef} type="button">
        <span class="duet-date__toggle-icon">
          <svg aria-hidden="true" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" transform="translate(2 2)">
              <path
                d="m2.5.5h12c1.1045695 0 2 .8954305 2 2v12c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-12c0-1.1045695.8954305-2 2-2z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="m.5 4.5h16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <g fill="currentColor">
                <circle cx="8.5" cy="8.5" r="1" />
                <circle cx="4.5" cy="8.5" r="1" />
                <circle cx="12.5" cy="8.5" r="1" />
                <circle cx="8.5" cy="12.5" r="1" />
                <circle cx="4.5" cy="12.5" r="1" />
                <circle cx="12.5" cy="12.5" r="1" />
              </g>
            </g>
          </svg>
        </span>
        <span class="duet-date__vhidden">
          {localization.buttonLabel}
          {formattedValue && (
            <span>
              , {localization.selectedDateMessage} {formattedValue}
            </span>
          )}
        </span>
      </button>
    </div>
  )
}
