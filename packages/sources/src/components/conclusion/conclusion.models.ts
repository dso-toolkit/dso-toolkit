import { Alert } from '../alert/alert.models';
import { Info } from '../info/info.models';

export interface ConclusionItem {
  modifier: string;
  label: string;
  subitems: string[];
}

export interface Conclusion<TemplateFnReturnType> {
  items: ConclusionItem[];
  alert?: Alert<TemplateFnReturnType>;
  info?: Info<TemplateFnReturnType>;
}
