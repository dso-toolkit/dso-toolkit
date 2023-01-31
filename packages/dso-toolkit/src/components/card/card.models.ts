import { Selectable } from "../selectable/selectable.models.js";

export interface Card<TemplateFnReturnType> {
  label: string;
  selectable?: Selectable<TemplateFnReturnType>;
  content: TemplateFnReturnType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interactions?: any[];
  image?: string;
  dsoCardClicked?: (e: CustomEvent<DsoCardClickedEvent>) => void;
}

export interface DsoCardClickedEvent {
  originalEvent?: MouseEvent;
}
