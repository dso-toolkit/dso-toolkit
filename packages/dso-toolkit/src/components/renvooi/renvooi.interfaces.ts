export type RenvooiValue = { toegevoegd: string } | { was: string; wordt: string } | { verwijderd: string } | string;

export type RenvooiMarkFunction = (text: string, value: RenvooiValue, source: RenvooiValue[]) => RenvooiText[];

export type RenvooiRenderMarkFunction = (text: string) => RenvooiText[] | undefined;

type RenvooiText = RenvooiMarkItem | string;

interface RenvooiMarkItem {
  text: string;
  highlight?: boolean;
}

export interface RenvooiMarkItemHighlightEvent {
  text: string;
  elementRef: HTMLElement;
}
