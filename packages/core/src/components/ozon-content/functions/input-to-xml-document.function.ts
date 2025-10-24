import { OzonContentInputType } from "../ozon-content.interfaces";

export function inputToXmlDocument(input: OzonContentInputType, domParser: DOMParser): XMLDocument {
  if (input instanceof XMLDocument) {
    return input;
  }

  return domParser.parseFromString(input, "text/xml");
}
