import readme from "@dso-toolkit/core/src/components/ozon-content/readme.md?raw";
import { Meta } from "@storybook/web-components";
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
  Opschrift,
  OpschriftWijzigactieVerwijder,
  OpschriftWijzigactieVoegtoe,
  RenvooiWeergave,
  Subtitel,
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
  Opschrift,
  OpschriftWijzigactieVerwijder,
  OpschriftWijzigactieVoegtoe,
  RenvooiWeergave,
  Subtitel,
  Table,
  TableMetBron,
  TableMetNoot,
  TableMetThead,
  TableZonderColsepEnMetRowsep,
};
