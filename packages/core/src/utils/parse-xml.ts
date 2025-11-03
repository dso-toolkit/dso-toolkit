const parser = new DOMParser();

export function parseXml(input: string): XMLDocument | null {
  if (input === "") {
    return null;
  }

  const doc = parser.parseFromString(input, "application/xml");

  if (doc.querySelector("parsererror")) {
    throw new Error(JSON.stringify({ message: "Unable to parse XML", input, document: doc }, null, 2));
  }

  return doc;
}
