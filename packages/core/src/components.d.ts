/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { DsoDatePickerChangeEvent, DsoDatePickerDirection, DsoDatePickerFocusEvent } from "./components/date-picker/date-picker";
export namespace Components {
    interface DsoAlert {
        /**
          * Whether or not to show the role attribute with value "alert". To control the tooltip add the `role-alert` attribute.
         */
        "roleAlert"?: boolean;
        /**
          * Set status of alert
         */
        "status": 'success' | 'info' | 'warning' | 'danger';
    }
    interface DsoAttachmentsCounter {
        "count": number;
    }
    interface DsoBadge {
        "status"?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
    }
    interface DsoDatePicker {
        /**
          * Forces the opening direction of the calendar modal to be always left or right. This setting can be useful when the input is smaller than the opening date picker would be as by default the picker always opens towards right.
         */
        "direction": DsoDatePickerDirection;
        /**
          * Makes the date picker input component disabled. This prevents users from being able to interact with the input, and conveys its inactive state to assistive technologies.
         */
        "disabled": boolean;
        /**
          * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus returning to the date picker's button. Default is true.
         */
        "hide": (moveFocusToButton?: boolean) => Promise<void>;
        /**
          * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
         */
        "identifier": string | undefined;
        /**
          * Maximum date allowed to be picked. Must be in Dutch date format: DD-MM-YYYY. This setting can be used alone or together with the min property.
         */
        "max": string | undefined;
        /**
          * Minimum date allowed to be picked. Must be in Dutch date format: DD-MM-YYYY. This setting can be used alone or together with the max property.
         */
        "min": string | undefined;
        /**
          * Name of the date picker input.
         */
        "name": string;
        /**
          * Should the input be marked as required?
         */
        "required": boolean;
        /**
          * Defines a specific role attribute for the date picker input.
         */
        "role": string | undefined;
        /**
          * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
         */
        "setFocus": () => Promise<void | undefined>;
        /**
          * Show the calendar modal, moving focus to the calendar inside.
         */
        "show": () => Promise<void>;
        /**
          * Date value. Must be in Dutch date format: DD-MM-YYYY.
         */
        "value": string;
    }
    interface DsoHighlightBox {
        "border"?: boolean;
        "dropShadow"?: boolean;
        "step"?: number;
        "white"?: boolean;
        "yellow"?: boolean;
    }
    interface DsoIcon {
        "icon": string;
    }
    interface DsoLabel {
        "status"?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
    }
    interface DsoProgressBar {
        "max": number;
        "min": number;
        "progress": number;
    }
    interface DsoTooltip {
        /**
          * Activate the tooltip (Sets the `active` attribute)
         */
        "activate": () => Promise<void>;
        /**
          * Whether or not to show the tooltip. To control the tooltip add the `active` attribute or use the `activate()` and `deactivate()` instance methods.
         */
        "active": boolean;
        /**
          * Deactivate the tooltip (Removes the `active` attribute)
         */
        "deactivate": () => Promise<void>;
        /**
          * Specify target element that the tooltip will describe and listens to for events. * `undefined`: The direct parent is used. * `string`: The element is located using `document.getElementById()` * `HTMLElement`: Pass the target element directly If the element is not found an Error is thrown.
         */
        "for"?: string | HTMLElement;
        /**
          * Set attribute `no-arrow` to hide the arrow
         */
        "noArrow": boolean;
        /**
          * Set position of tooltip relative to target
         */
        "position": 'top' | 'right' | 'bottom' | 'left';
    }
}
declare global {
    interface HTMLDsoAlertElement extends Components.DsoAlert, HTMLStencilElement {
    }
    var HTMLDsoAlertElement: {
        prototype: HTMLDsoAlertElement;
        new (): HTMLDsoAlertElement;
    };
    interface HTMLDsoAttachmentsCounterElement extends Components.DsoAttachmentsCounter, HTMLStencilElement {
    }
    var HTMLDsoAttachmentsCounterElement: {
        prototype: HTMLDsoAttachmentsCounterElement;
        new (): HTMLDsoAttachmentsCounterElement;
    };
    interface HTMLDsoBadgeElement extends Components.DsoBadge, HTMLStencilElement {
    }
    var HTMLDsoBadgeElement: {
        prototype: HTMLDsoBadgeElement;
        new (): HTMLDsoBadgeElement;
    };
    interface HTMLDsoDatePickerElement extends Components.DsoDatePicker, HTMLStencilElement {
    }
    var HTMLDsoDatePickerElement: {
        prototype: HTMLDsoDatePickerElement;
        new (): HTMLDsoDatePickerElement;
    };
    interface HTMLDsoHighlightBoxElement extends Components.DsoHighlightBox, HTMLStencilElement {
    }
    var HTMLDsoHighlightBoxElement: {
        prototype: HTMLDsoHighlightBoxElement;
        new (): HTMLDsoHighlightBoxElement;
    };
    interface HTMLDsoIconElement extends Components.DsoIcon, HTMLStencilElement {
    }
    var HTMLDsoIconElement: {
        prototype: HTMLDsoIconElement;
        new (): HTMLDsoIconElement;
    };
    interface HTMLDsoLabelElement extends Components.DsoLabel, HTMLStencilElement {
    }
    var HTMLDsoLabelElement: {
        prototype: HTMLDsoLabelElement;
        new (): HTMLDsoLabelElement;
    };
    interface HTMLDsoProgressBarElement extends Components.DsoProgressBar, HTMLStencilElement {
    }
    var HTMLDsoProgressBarElement: {
        prototype: HTMLDsoProgressBarElement;
        new (): HTMLDsoProgressBarElement;
    };
    interface HTMLDsoTooltipElement extends Components.DsoTooltip, HTMLStencilElement {
    }
    var HTMLDsoTooltipElement: {
        prototype: HTMLDsoTooltipElement;
        new (): HTMLDsoTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "dso-alert": HTMLDsoAlertElement;
        "dso-attachments-counter": HTMLDsoAttachmentsCounterElement;
        "dso-badge": HTMLDsoBadgeElement;
        "dso-date-picker": HTMLDsoDatePickerElement;
        "dso-highlight-box": HTMLDsoHighlightBoxElement;
        "dso-icon": HTMLDsoIconElement;
        "dso-label": HTMLDsoLabelElement;
        "dso-progress-bar": HTMLDsoProgressBarElement;
        "dso-tooltip": HTMLDsoTooltipElement;
    }
}
declare namespace LocalJSX {
    interface DsoAlert {
        /**
          * Whether or not to show the role attribute with value "alert". To control the tooltip add the `role-alert` attribute.
         */
        "roleAlert"?: boolean;
        /**
          * Set status of alert
         */
        "status": 'success' | 'info' | 'warning' | 'danger';
    }
    interface DsoAttachmentsCounter {
        "count": number;
    }
    interface DsoBadge {
        "status"?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
    }
    interface DsoDatePicker {
        /**
          * Forces the opening direction of the calendar modal to be always left or right. This setting can be useful when the input is smaller than the opening date picker would be as by default the picker always opens towards right.
         */
        "direction"?: DsoDatePickerDirection;
        /**
          * Makes the date picker input component disabled. This prevents users from being able to interact with the input, and conveys its inactive state to assistive technologies.
         */
        "disabled"?: boolean;
        /**
          * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
         */
        "identifier"?: string | undefined;
        /**
          * Maximum date allowed to be picked. Must be in Dutch date format: DD-MM-YYYY. This setting can be used alone or together with the min property.
         */
        "max"?: string | undefined;
        /**
          * Minimum date allowed to be picked. Must be in Dutch date format: DD-MM-YYYY. This setting can be used alone or together with the max property.
         */
        "min"?: string | undefined;
        /**
          * Name of the date picker input.
         */
        "name"?: string;
        /**
          * Event emitted when a date is selected.
         */
        "onDateChange"?: (event: CustomEvent<DsoDatePickerChangeEvent>) => void;
        /**
          * Event emitted the date picker input is blurred.
         */
        "onDsoBlur"?: (event: CustomEvent<DsoDatePickerFocusEvent>) => void;
        /**
          * Event emitted the date picker input is focused.
         */
        "onDsoFocus"?: (event: CustomEvent<DsoDatePickerFocusEvent>) => void;
        /**
          * Should the input be marked as required?
         */
        "required"?: boolean;
        /**
          * Defines a specific role attribute for the date picker input.
         */
        "role"?: string | undefined;
        /**
          * Date value. Must be in Dutch date format: DD-MM-YYYY.
         */
        "value"?: string;
    }
    interface DsoHighlightBox {
        "border"?: boolean;
        "dropShadow"?: boolean;
        "step"?: number;
        "white"?: boolean;
        "yellow"?: boolean;
    }
    interface DsoIcon {
        "icon": string;
    }
    interface DsoLabel {
        "status"?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
    }
    interface DsoProgressBar {
        "max"?: number;
        "min"?: number;
        "progress": number;
    }
    interface DsoTooltip {
        /**
          * Whether or not to show the tooltip. To control the tooltip add the `active` attribute or use the `activate()` and `deactivate()` instance methods.
         */
        "active"?: boolean;
        /**
          * Specify target element that the tooltip will describe and listens to for events. * `undefined`: The direct parent is used. * `string`: The element is located using `document.getElementById()` * `HTMLElement`: Pass the target element directly If the element is not found an Error is thrown.
         */
        "for"?: string | HTMLElement;
        /**
          * Set attribute `no-arrow` to hide the arrow
         */
        "noArrow"?: boolean;
        /**
          * Set position of tooltip relative to target
         */
        "position"?: 'top' | 'right' | 'bottom' | 'left';
    }
    interface IntrinsicElements {
        "dso-alert": DsoAlert;
        "dso-attachments-counter": DsoAttachmentsCounter;
        "dso-badge": DsoBadge;
        "dso-date-picker": DsoDatePicker;
        "dso-highlight-box": DsoHighlightBox;
        "dso-icon": DsoIcon;
        "dso-label": DsoLabel;
        "dso-progress-bar": DsoProgressBar;
        "dso-tooltip": DsoTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dso-alert": LocalJSX.DsoAlert & JSXBase.HTMLAttributes<HTMLDsoAlertElement>;
            "dso-attachments-counter": LocalJSX.DsoAttachmentsCounter & JSXBase.HTMLAttributes<HTMLDsoAttachmentsCounterElement>;
            "dso-badge": LocalJSX.DsoBadge & JSXBase.HTMLAttributes<HTMLDsoBadgeElement>;
            "dso-date-picker": LocalJSX.DsoDatePicker & JSXBase.HTMLAttributes<HTMLDsoDatePickerElement>;
            "dso-highlight-box": LocalJSX.DsoHighlightBox & JSXBase.HTMLAttributes<HTMLDsoHighlightBoxElement>;
            "dso-icon": LocalJSX.DsoIcon & JSXBase.HTMLAttributes<HTMLDsoIconElement>;
            "dso-label": LocalJSX.DsoLabel & JSXBase.HTMLAttributes<HTMLDsoLabelElement>;
            "dso-progress-bar": LocalJSX.DsoProgressBar & JSXBase.HTMLAttributes<HTMLDsoProgressBarElement>;
            "dso-tooltip": LocalJSX.DsoTooltip & JSXBase.HTMLAttributes<HTMLDsoTooltipElement>;
        }
    }
}
