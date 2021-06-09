import { Info } from '../info/info.models';

export interface Selectable<TemplateFnReturnType> {
  type: 'radio' | 'checkbox';
  id: string;
  name?: string;
  label: string;
  value: string;
  required?: boolean;
  invalid?: boolean;
  describedById?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (e: Event) => void;
  info?: Info<TemplateFnReturnType>;
}
