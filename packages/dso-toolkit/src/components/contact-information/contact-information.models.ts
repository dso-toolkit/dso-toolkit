import { Link } from "../link";
import { Heading } from "../heading";

export interface ContactInformation<TemplateFnReturnType> {
  heading?: Heading<TemplateFnReturnType>;
  anchorItems?: Link[];
  infoItems?: string[];
}
