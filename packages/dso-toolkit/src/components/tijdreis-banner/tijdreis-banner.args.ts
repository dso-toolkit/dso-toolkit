import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { TijdreisBanner } from "./tijdreis-banner.models";

export interface TijdreisBannerArgs {
  dsoTijdreisBannerClick: HandlerFunction;
}

export const tijdreisBannerArgTypes: ArgTypes<TijdreisBannerArgs> = {
  dsoTijdreisBannerClick: argTypeAction(),
};

export function tijdreisBannerArgsMapper(a: TijdreisBannerArgs): TijdreisBanner {
  return {
    dsoTijdreisBannerClick: (e) => a.dsoTijdreisBannerClick(e),
  };
}
