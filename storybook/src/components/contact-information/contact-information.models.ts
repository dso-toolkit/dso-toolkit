import { Heading } from "../heading/heading.models.js";
import { Link } from "../link/link.models.js";

export interface ContactInformation<TemplateFnReturnType> {
  heading?: Heading<TemplateFnReturnType>;
  linkItems?: Link[];
  infoItems?: string[];
}
