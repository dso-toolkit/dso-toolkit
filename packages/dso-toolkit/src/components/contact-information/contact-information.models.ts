import { Heading } from "../heading";
import { Link } from "../link";

export interface ContactInformation<TemplateFnReturnType> {
  heading?: Heading<TemplateFnReturnType>;
  linkItems?: Link[];
  infoItems?: string[];
}
