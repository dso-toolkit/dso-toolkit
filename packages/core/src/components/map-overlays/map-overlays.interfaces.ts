export interface Overlay {
  id: number;
  name: string;
}

export type CheckedOverlaysChangeEvent = CustomEvent<Overlay[]>
