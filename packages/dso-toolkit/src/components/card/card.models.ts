import { Button } from "../button/button.models.js";
import { Label } from "../label/label.models.js";
import { Selectable } from "../selectable/selectable.models.js";
import { Toggletip } from "../toggletip/toggletip.models.js";

export const imageShapes = ["normal", "wide"] as const;

export interface Card<TemplateFnReturnType> {
  label: string;
  /** Use only with `clickable: false`. */
  href?: string;
  selectable?: Selectable<TemplateFnReturnType>;
  content?: TemplateFnReturnType;
  interactions?: Array<Button | Label | Toggletip<TemplateFnReturnType>>;
  image?: string;
  imageShape?: (typeof imageShapes)[number];
  /** @deprecated use `href` */
  clickable?: boolean;
  dsoCardClicked?: (e: CustomEvent<DsoCardClickedEvent>) => void;
}

export interface DsoCardClickedEvent {
  originalEvent?: MouseEvent;
}
