export interface Renvooi {
  value: RenvooiValue | RenvooiValue[];
  mark?: RenvooiMarkFunction;
  dsoRenvooiMarkItemHighlight?: (e: CustomEvent) => void;
}

type RenvooiMarkFunction = (text: string, value: RenvooiValue, source: RenvooiValue[]) => RenvooiText[];

type RenvooiText = RenvooiMarkItem | string;

interface RenvooiMarkItem {
  text: string;
  highlight?: boolean;
}

export type RenvooiValue = { toegevoegd: string } | { was: string; wordt: string } | { verwijderd: string } | string;
