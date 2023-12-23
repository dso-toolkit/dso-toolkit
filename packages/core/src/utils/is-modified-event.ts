/**
 * returns `true` when the event is triggered while holding Ctrl, Alt or other modifiers, or on right-click.
 *
 * Can be used to determine navigation.
 * */
export function isModifiedEvent(e: MouseEvent): boolean {
  return e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey;
}
