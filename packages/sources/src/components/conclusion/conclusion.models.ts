import { Alert } from '../alert/alert.models';
import { Info } from '../info/info.models';

export interface ConclusionSubitem<TemplateFnReturnType> {
  richContent: TemplateFnReturnType;
}

export interface ConclusionItem<TemplateFnReturnType> {
  modifier: string;
  label: string;
  subitems: ConclusionSubitem<TemplateFnReturnType>[];
}

export interface Conclusion<TemplateFnReturnType> {
  items: ConclusionItem<TemplateFnReturnType>[];
  alert?: Alert<TemplateFnReturnType>;
  info?: Info<TemplateFnReturnType>;
}
