import { Heading } from "../heading/heading.models.js";
import { Link } from "../link/link.models.js";

export interface ContactInformation {
  heading?: Heading;
  linkItems?: Link[];
  infoItems?: string[];
}
