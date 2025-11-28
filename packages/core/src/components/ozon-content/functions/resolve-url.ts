import { OzonContentUrlResolver } from "../ozon-content.interfaces";

export function resolveUrlByRef(
  name: "ExtRef" | "ExtIoRef" | "IntIoRef" | "IntRef",
  value: string,
  node: Element,
  urlResolver?: OzonContentUrlResolver,
): string {
  if (urlResolver) {
    return urlResolver(name, "ref", value, node);
  }

  return value;
}

export function resolveUrlByNaam(
  name: "Illustratie" | "InlineTekstAfbeelding",
  value: string,
  node: Element,
  urlResolver?: OzonContentUrlResolver,
): string {
  if (urlResolver) {
    return urlResolver(name, "naam", value, node);
  }

  return value;
}
