import { AnnotationButton } from "./annotation-button.models";

export interface AnnotationButtonTemplates<TemplateFnReturnType> {
  annotationButtonTemplate: (annotationButtonProperties: AnnotationButton) => TemplateFnReturnType;
}
