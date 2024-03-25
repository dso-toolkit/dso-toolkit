export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toHaveBeenCalledWith(...params: any): R;
      toHaveBeenCalled(): R;
    }
  }
}
