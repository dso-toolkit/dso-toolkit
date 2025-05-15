import { type Meta, moduleMetadata } from "@storybook/angular";

import readme from "@dso-toolkit/core/src/components/ozon-content/readme.md?raw";
import { OzonContentArgs, ozonContentMeta, ozonContentStories } from "dso-toolkit";
import { templateContainer } from "../../templates";
import { DsoOzonContent } from "../../projects/component-library/src/public-api";

const meta: Meta<OzonContentArgs> = {
  ...ozonContentMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoOzonContent],
    }),
  ],
  title: "Ozon Content",
};

export default meta;

const {
  Al,
  ComplexeTableZonderColsepEnMetRowsep,
  ExtIoRef,
  ExtRef,
  Figuur,
  Inhoud,
  InhoudAlNoot,
  IntIoRef,
  IntRef,
  Lijst,
  Opschrift,
  RenvooiWeergave,
  Table,
  TableMetBron,
  TableMetNoot,
  TableMetThead,
  TableZonderColsepEnMetRowsep,
} = ozonContentStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { ozonContentTemplate } = templates;

    return {
      ozonContentTemplate,
    };
  },
});

export {
  Al,
  ComplexeTableZonderColsepEnMetRowsep,
  ExtIoRef,
  ExtRef,
  Figuur,
  Inhoud,
  InhoudAlNoot,
  IntIoRef,
  IntRef,
  Lijst,
  Opschrift,
  RenvooiWeergave,
  Table,
  TableMetBron,
  TableMetNoot,
  TableMetThead,
  TableZonderColsepEnMetRowsep,
};
