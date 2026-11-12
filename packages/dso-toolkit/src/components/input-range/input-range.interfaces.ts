export interface InputRangeChangeEvent {
  originalEvent: Event;
  value: number | undefined;
  min: number;
  max: number;
  step: number;
}
