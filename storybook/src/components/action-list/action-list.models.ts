export interface ActionList<TemplateFnReturnType> {
  title: string;
  actionListItems: ActionListItem<TemplateFnReturnType>[];
}

export interface ActionListItem<TemplateFnReturnType> {
  title?: string;
  flowLine?: boolean;
  warning?: boolean;
  divider?: boolean;
  content?: TemplateFnReturnType;
}
