export interface Renvooi {
  value?: RenvooiValue | RenvooiValue[];
}

export type RenvooiValue = { toegevoegd: string } | { was: string; wordt: string } | { verwijderd: string } | string;
