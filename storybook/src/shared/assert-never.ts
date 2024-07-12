/**
 * Asserts that the given value is of type `never`. This function can be used to ensure that all cases of a discriminated union are handled.
 *
 * Only throws an error if a message is provided.
 */
export function assertNever(value: never, message?: string): void {
  if (message) {
    throw new Error(`Unexpected value "${value}": ${message}`);
  }
}
