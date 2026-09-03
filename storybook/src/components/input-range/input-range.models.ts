export interface InputRange {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  label?: string;
  unit: string;
  description?: string;
  dsoChange?: (e: InputRangeChangeEvent) => void;
}

export interface InputRangeChangeEvent {
  originalEvent: Event;
  value: number | undefined;
  min: number;
  max: number;
  step: number;
}
