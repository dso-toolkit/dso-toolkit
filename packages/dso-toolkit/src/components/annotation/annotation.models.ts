import { AnnotationButton } from "../annotation-button/annotation-button.models";
import { AnnotationOutput } from "../annotation-output/annotation-output.models";

export interface Annotation<TemplateFnReturnType> {
  annotationButton: AnnotationButton;
  annotationOutput: AnnotationOutput<TemplateFnReturnType>;
}
