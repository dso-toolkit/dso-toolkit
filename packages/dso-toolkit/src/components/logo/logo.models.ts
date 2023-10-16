export interface Logo {
  label?: string;
  ribbon?: string;
}

export function islogoInterface(object: unknown): object is Logo {
  return "compact" in (object as Logo);
}
