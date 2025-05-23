import readme from "@dso-toolkit/core/src/components/ozon-content/readme.md?raw";
import { type Meta, moduleMetadata } from "@storybook/angular";
import { OzonContentArgs, ozonContentMeta, ozonContentStories } from "dso-toolkit";

import { DsoOzonContent } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

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
