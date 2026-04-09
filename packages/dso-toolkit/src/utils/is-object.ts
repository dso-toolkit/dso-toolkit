export function isObject(object: unknown): object is object {
  return object !== null && typeof object === "object";
}
