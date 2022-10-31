import { ArgTypes } from "../../storybook";
import { AttachmentsCounter } from "./attachments-counter.models";

export interface AttachmentsCounterArgs {
  count: number;
}

export const attachmentsCounterArgTypes: ArgTypes<AttachmentsCounterArgs> = {
  count: {
    control: {
      type: "number",
    },
  },
};

export function attachmentsCounterArgsMapper(a: AttachmentsCounterArgs): AttachmentsCounter {
  return {
    count: a.count,
  };
}
