import { Icon } from '../icon/icon.models';

export interface Button {
  type?: 'button' | 'submit';
  modifier?: string | typeof ButtonAnonymous;
  label: string;
  id?: string;
  disabled?: boolean;
  icon?: Icon;
  iconMode?: 'only' | 'after';
  ariaDescribedby?: string;
  ariaExpanded?: boolean;
  ariaHaspopup?: boolean;
  ariaRoledescription?: string;
  onClick?: (event: MouseEvent) => void;
}

export const ButtonAnonymous = Symbol('ButtonAnonymous');
