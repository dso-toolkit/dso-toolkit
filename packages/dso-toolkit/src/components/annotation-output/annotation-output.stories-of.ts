import { AnnotationOutput } from "./annotation-output.models";

export interface AnnotationOutputTemplates<TemplateFnReturnType> {
  annotationOutputTemplate: (
    annotationOutputProperties: AnnotationOutput<TemplateFnReturnType>
  ) => TemplateFnReturnType;
}
