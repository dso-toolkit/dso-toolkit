import { storiesOf } from "@storybook/angular";

import { storiesOfModal } from "../../../sources";
import { DsoModal } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import {
  activeBody,
  activeFooter,
  confirmBody,
  confirmFooter,
  loadingBody,
  passiveBody,
  passiveFooter,
} from "./modal.content";

import readme from "./readme.md";

storiesOfModal(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ modalTemplate }) => ({
      modalTemplate,
      activeBody,
      activeFooter,
      passiveBody,
      passiveFooter,
      confirmBody,
      confirmFooter,
      loadingBody: loadingBody(),
    }),
  },
  { component: DsoModal }
);
