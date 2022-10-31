import { activeFilters } from "./label-group.content";
import { LabelGroup } from "./label-group.models";

export function labelGroupArgsMapper(): LabelGroup {
  return {
    labels: activeFilters,
  };
}
