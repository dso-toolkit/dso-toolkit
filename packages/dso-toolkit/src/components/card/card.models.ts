import { isObject } from "../../utils/is-object";
import { Button } from "../button";
import { InfoButton } from "../info-button";
import { Label } from "../label";
import { Link } from "../link";
import { Selectable } from "../selectable";
import { SlideToggle } from "../slide-toggle";

export interface Card<TemplateFnReturnType> {
  label: string;
  href: string;
  active?: boolean;
  mode?: Link["mode"];
  selectable?: Selectable<TemplateFnReturnType>;
  content?: TemplateFnReturnType;
  interactions?: Array<Button | Label | InfoButton<TemplateFnReturnType> | SlideToggle>;
  dsoCardClick?: (e: CustomEvent<CardClickEvent>) => void;
}

export interface CardClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export function isCardInterface<TemplateFnReturnType>(object: unknown): object is Card<TemplateFnReturnType> {
  return isObject(object) && !("targetBlank" in object) && !("status" in object);
}
