import { forceUpdate } from "@stencil/core";

const observers = new WeakMap<HTMLElement, MutationObserver>();

export function watcher(host: HTMLElement) {
  return {
    watch() {
      let observer = observers.get(host);
      if (!observer) {
        observer = new MutationObserver(() => forceUpdate(host));
        observers.set(host, observer);
      }

      observer.observe(host, { childList: true });
    },
    hasSymbool() {
      return host.querySelector("[slot=symbool]") !== null;
    },
    unwatch() {
      const observer = observers.get(host);
      if (!observer) {
        return;
      }

      observer.disconnect();
      observers.delete(host);
    },
  };
}
