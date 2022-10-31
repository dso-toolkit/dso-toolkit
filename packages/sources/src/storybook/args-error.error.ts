export class ArgsError extends Error {
  constructor() {
    super("No args found, always provide args or empty object");

    this.name = "ArgsError";
  }
}
