/**
 * Form random hash
 */
export function chr4() {
  return Math.random().toString(16).slice(-4);
}

/**
 * Create random identifier with a prefix
 * @param prefix
 */
export function createIdentifier(prefix: string): string {
  return `${prefix}-${chr4()}${chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
}
