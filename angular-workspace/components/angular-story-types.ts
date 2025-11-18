export interface NgModuleLikeMetadata {
  imports?: ReadonlyArray<unknown>;
  declarations?: ReadonlyArray<unknown>;
  providers?: ReadonlyArray<unknown>;
  schemas?: ReadonlyArray<unknown>;
}

export interface AngularTemplateResult<Props = unknown> {
  template: string;
  props?: Props;
  moduleMetadata?: NgModuleLikeMetadata;
}
