import { activeFilters } from "./label-group.content.js";
import { LabelGroup } from "./label-group.models.js";

export function labelGroupArgsMapper(): LabelGroup {
  return {
    labels: activeFilters,
  };
}
