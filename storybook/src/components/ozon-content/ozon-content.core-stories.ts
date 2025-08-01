import readme from "@dso-toolkit/core/src/components/ozon-content/readme.md?raw";
import { Meta } from "@storybook/web-components-vite";
import { OzonContentArgs, ozonContentMeta, ozonContentStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<OzonContentArgs> = {
  ...ozonContentMeta({ readme }),
  title: "Core/Ozon Content",
};

export default meta;

const {
  Abbr,
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
  RenvooiWeergave,
  Table,
  TableMetBron,
  TableMetNoot,
  TableMetThead,
  TableZonderColsepEnMetRowsep,
  Kop,
  KopMetRenvooi,
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
  Abbr,
  Al,
  ComplexeTableZonderColsepEnMetRowsep,
  ExtIoRef,
  ExtRef,
  Figuur,
  Inhoud,
  InhoudAlNoot,
  IntIoRef,
  IntRef,
  Kop,
  KopMetRenvooi,
  Lijst,
  RenvooiWeergave,
  Table,
  TableMetBron,
  TableMetNoot,
  TableMetThead,
  TableZonderColsepEnMetRowsep,
};
