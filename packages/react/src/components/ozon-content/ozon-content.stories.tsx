import { Meta } from "@storybook/react";

import readme from "./readme.md?raw";
import { OzonContentArgs, ozonContentMeta, ozonContentStories } from "dso-toolkit";
import { templateContainer } from "../../templates";

const meta: Meta<OzonContentArgs> = {
  ...ozonContentMeta({ readme }),
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