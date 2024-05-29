import { EventEmitter, FunctionalComponent, h } from "@stencil/core";
import { AnnotationActiveChangeEvent, AnnotationDiff, AnnotationWijzigactie } from "./annotation.interfaces";

export type AnnotationProps =
  | AnnotationActiviteitProps
  | AnnotationGebiedsaanwijzingProps
  | AnnotationOmgevingsnormProps
  | AnnotationWerkingsgebiedProps;

interface AnnotationBaseProps {
  symbool?: string;
  wijzigactie?: AnnotationWijzigactie;
  active?: boolean;
  gewijzigdeLocatie?: boolean;
  dsoActiveChange?: EventEmitter<AnnotationActiveChangeEvent>;
}

export interface AnnotationActiviteitProps extends AnnotationBaseProps {
  type: "activiteit";
  naam?: AnnotationDiff | string;
  regelKwalificatie?: AnnotationDiff | string;
  locatieNoemers?: Array<AnnotationDiff | string>;
  regelKwalificatieVoorzetsel?: string;
}

export interface AnnotationGebiedsaanwijzingProps extends AnnotationBaseProps {
  type: "gebiedsaanwijzing";
  naam?: AnnotationDiff | string;
}

export interface AnnotationOmgevingsnormProps extends AnnotationBaseProps {
  type: "omgevingsnorm";
  naam?: AnnotationDiff | string;
  waardes?: Array<AnnotationDiff | string>;
  eenheid?: AnnotationDiff | string;
}

export interface AnnotationWerkingsgebiedProps extends AnnotationBaseProps {
  type: "werkingsgebied";
  locatieNoemers?: Array<AnnotationDiff | string>;
}

export const Annotation: FunctionalComponent<AnnotationProps> = (_props) => {
  return (
    <div>
      <div>
        <slot name="symbool"></slot>
      </div>
      <div></div>
    </div>
  );
};
