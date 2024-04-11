import { Selectable } from "../selectable/selectable.models";

export interface LegendItem<TemplateFnReturnType> {
  body?: TemplateFnReturnType;
  disabled?: boolean;
  disabledMessage?: string;
  dsoMouseEnter?: () => void;
  dsoMouseLeave?: () => void;
  dsoRemoveClick?: (e: CustomEvent<LegendItemRemoveClickEvent>) => void;
  label: string;
  removable?: boolean;
  selectable?: Selectable<TemplateFnReturnType>;
  symbol?: string;
}

export interface LegendItemRemoveClickEvent {
  originalEvent: MouseEvent;
}
