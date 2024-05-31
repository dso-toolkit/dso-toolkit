import { FunctionalComponent, Fragment, h } from "@stencil/core";

import { AnnotationDiff } from "./annotation.interfaces";

interface AnnotationDiffRendererProps {
  value: AnnotationDiff | string | undefined | Array<AnnotationDiff | string | undefined>;
}

export const AnnotationDiffRenderer: FunctionalComponent<AnnotationDiffRendererProps> = ({ value }) => {
  if (typeof value === "string" || !value) {
    return value;
  }

  if ("toegevoegd" in value) {
    return <ins>{value.toegevoegd}</ins>;
  }

  if ("verwijderd" in value) {
    return <del>{value.verwijderd}</del>;
  }

  if (Array.isArray(value)) {
    return (
      <>
        {value.map((v, i, { length }) => (
          <>
            <AnnotationDiffRenderer value={v} />
            {i < length - 1 ? ", " : ""}
          </>
        ))}
      </>
    );
  }

  return (
    <>
      <del>{value.was}</del> <ins>{value.wordt}</ins>
    </>
  );
};
