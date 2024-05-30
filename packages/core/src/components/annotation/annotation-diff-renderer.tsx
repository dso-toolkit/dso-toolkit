import { FunctionalComponent, h } from "@stencil/core";

import { AnnotationDiff } from "./annotation.interfaces";

interface AnnotationDiffRendererProps {
  value: AnnotationDiff | string | undefined | Array<AnnotationDiff | string | undefined>;
}

export const AnnotationDiffRenderer: FunctionalComponent<AnnotationDiffRendererProps> = ({ value }) => {
  if (typeof value === "string" || !value) {
    return <span>{value}</span>;
  }

  if ("toegevoegd" in value) {
    return <ins>{value.toegevoegd}</ins>;
  }

  if ("verwijderd" in value) {
    return <del>{value.verwijderd}</del>;
  }

  if (Array.isArray(value)) {
    return (
      <span>
        {value.map((v, i, { length }) => (
          <span key={i}>
            <AnnotationDiffRenderer value={v} />
            {i < length - 1 ? ", " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span>
      <del>{value.was}</del> <span>{value.wordt}</span>
    </span>
  );
};
