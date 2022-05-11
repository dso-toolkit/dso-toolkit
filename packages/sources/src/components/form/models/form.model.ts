import { FormGroup } from './form-group.model';

export interface Form<TemplateFnReturnType> {
  legend?: string;
  mode?: 'vertical' | 'horizontal';

  formGroups: FormGroup<TemplateFnReturnType>[] | TemplateFnReturnType;
}
