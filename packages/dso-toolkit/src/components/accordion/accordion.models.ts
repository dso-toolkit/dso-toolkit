import { LabelStatus } from "../label";

export type AccordionHandleElement = "anchor" | "button";

export type AccordionVariant = "default" | "compact" | "conclusion" | "neutral" | "compact-black";

export type AccordionSectionStatus = "success" | "info" | "warning" | "danger" | "error";

export type AccordionHeading = "h2" | "h3" | "h4" | "h5";

export interface Accordion<TemplateFnReturnType> {
  variant?: AccordionVariant;
  reverseAlign?: boolean;
  sections: AccordionSection<TemplateFnReturnType>[];
}

export interface AccordionSection<TemplateFnReturnType> {
  open?: boolean;
  handleTitle: string;
  heading: AccordionHeading;
  handleUrl?: string;
  statusDescription?: string;
  status?: AccordionSectionStatus;
  icon?: string;
  attachmentCount?: number;
  content?: TemplateFnReturnType;
  labelStatus?: LabelStatus;
  labelLabel?: string;
  dsoToggleClick?: (e: CustomEvent<AccordionSectionToggleClickEvent>) => void;
  dsoAnimationStart?: (e: CustomEvent<AccordionSectionAnimationStartEvent>) => void;
  dsoAnimationEnd?: (e: CustomEvent<AccordionSectionAnimationEndEvent>) => void;
}

export interface AccordionSectionToggleClickEvent {
  /**
   * The original MouseEvent that triggered the click.
   *
   * In case the Section Handle is an <a> this event can be used to preventDefault() so the framework router is reponsible for navigating the user.
   */
  originalEvent?: MouseEvent;

  /**
   * The requested state. If the Accordion Section is closed, `open = true`.
   */
  open: boolean;
}

export interface AccordionSectionAnimationStartEvent {
  /**
   * Helper function to scroll the Accordion Section into view.
   */
  scrollIntoView(): void;
}

export interface AccordionSectionAnimationEndEvent {
  /**
   * Helper function to scroll the Accordion Section into view.
   */
  scrollIntoView(): void;

  /**
   * The state of the Accordion Section after animation.
   */
  open: boolean;
}
