import { Anchor } from "../anchor";
import { Heading } from "../heading";

export interface ContactInformation<TemplateFnReturnType> {
  heading?: Heading<TemplateFnReturnType>;
  anchorItems?: Anchor[];
  infoItems?: string[];
}
