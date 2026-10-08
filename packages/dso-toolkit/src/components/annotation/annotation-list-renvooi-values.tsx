import { Fragment, FunctionalComponent, h } from "@stencil/core";

import { RenvooiValue } from "../renvooi/renvooi.interfaces";

interface AnnotationListRenvooiValuesProps {
  values: RenvooiValue[] | undefined;
}

export const AnnotationListRenvooiValues: FunctionalComponent<AnnotationListRenvooiValuesProps> = ({ values }) => {
  return (
    <>
      {values?.map((v, i) => (
        <>
          {i > 0 && ", "}
          <dso-renvooi value={v} />
        </>
      ))}
    </>
  );
};
