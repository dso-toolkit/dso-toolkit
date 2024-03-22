import { Selectable } from "../selectable/selectable.models";

export interface LegendItem<TemplateFnReturnType> {
  body: TemplateFnReturnType | undefined;
  disabled: boolean;
  dsoMouseEnter: () => void;
  dsoMouseLeave: () => void;
  dsoRemoveClick: (e: CustomEvent<MouseEvent>) => void;
  label: string;
  removable?: boolean;
  selectable?: Selectable<TemplateFnReturnType>;
  symbol?: string;
}
