const parser = new DOMParser();

export function parseXml(input: string): XMLDocument | undefined {
  if (!input) {
    return undefined;
  }

  const doc = parser.parseFromString(input, "application/xml");

  if (doc.querySelector("parsererror")) {
    console.error(
      {
        message: "Unable to parse XML",
        input,
        document: doc,
      },
      null,
      2,
    );

    return undefined;
  }

  return doc;
}
