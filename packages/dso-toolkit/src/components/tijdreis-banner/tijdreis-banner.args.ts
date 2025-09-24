import { HandlerFunction } from "storybook/actions";

import { TijdreisBanner } from "./tijdreis-banner.models";

export interface TijdreisBannerArgs {
  click: HandlerFunction;
}

export function tijdreisBannerArgs(a: TijdreisBannerArgs): TijdreisBanner {
  return {
    onClick: a.click,
  };
}
