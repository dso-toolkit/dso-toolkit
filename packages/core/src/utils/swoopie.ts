const DURATION = 550;
const STEPS = 24;
const CHECK_SIZE = 24;
const OFFSET_X = 4;

type Point = { x: number; y: number };

const activeAnimations = new WeakMap<HTMLElement, () => void>();

const isVisible = (element: HTMLElement): boolean => {
  const { width, height, right, bottom, left, top } = element.getBoundingClientRect();

  return width > 0 && height > 0 && right > 0 && bottom > 0 && left < window.innerWidth && top < window.innerHeight;
};

export const cancelSwoopie = (from: HTMLElement): void => {
  activeAnimations.get(from)?.();
};

export function swoopie(target: HTMLElement, from: HTMLElement, to: HTMLElement): Promise<void> {
  if (
    typeof window === "undefined" ||
    !window.matchMedia("(prefers-reduced-motion: no-preference)").matches ||
    !isVisible(from) ||
    !isVisible(to)
  ) {
    return Promise.resolve();
  }

  cancelSwoopie(from);

  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();

  const start: Point = {
    x: fromRect.left + CHECK_SIZE / 2 + OFFSET_X,
    y: fromRect.top + CHECK_SIZE / 2,
  };

  const end: Point = {
    x: toRect.left - CHECK_SIZE / 2 + OFFSET_X,
    y: toRect.top + toRect.height / 2,
  };

  const clone = target.cloneNode(true);

  if (clone instanceof Element) {
    clone.removeAttribute("id");
    clone.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
  }

  const outer = document.createElement("div");
  outer.setAttribute("aria-hidden", "true");
  outer.append(clone);

  Object.assign(outer.style, {
    position: "fixed",
    left: "0px",
    top: "0px",
    pointerEvents: "none",
    zIndex: "1000",
    willChange: "transform",
  });

  document.body.append(outer);

  const dx = end.x - start.x;
  const control: Point = {
    x: start.x + dx * 0.5,
    y: start.y + (end.y - start.y) * 0.25 - start.y * 0.5,
  };

  const keyframes: Keyframe[] = Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    const inv = 1 - t;
    const x = inv * inv * start.x + 2 * inv * t * control.x + t * t * end.x - CHECK_SIZE / 2;
    const y = inv * inv * start.y + 2 * inv * t * control.y + t * t * end.y - CHECK_SIZE / 2;
    const scale = 1 - t * 0.35;

    return {
      transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      offset: t,
    };
  });

  return new Promise<void>((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;

    const animation = outer.animate(keyframes, {
      duration: DURATION,
      easing: "ease-out",
      fill: "forwards",
    });

    const cleanup = (): void => {
      if (signal.aborted) {
        return;
      }

      controller.abort();
      animation.cancel();
      outer.remove();

      if (activeAnimations.get(from) === cleanup) {
        activeAnimations.delete(from);
      }

      resolve();
    };

    activeAnimations.set(from, cleanup);
    animation.addEventListener("finish", cleanup, { signal });
    window.addEventListener("scroll", cleanup, {
      capture: true,
      passive: true,
      signal,
    });

    window.addEventListener("resize", cleanup, {
      passive: true,
      signal,
    });
  });
}
