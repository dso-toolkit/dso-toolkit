export type MarkTextMarkFunction = (text: string) => MarkTextText[] | undefined;

export type MarkTextText = MarkTextMarkItem | string;

export interface MarkTextMarkItem {
  text: string;
  highlight?: boolean;
}
