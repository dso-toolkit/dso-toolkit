export interface ActionList<TemplateFnReturnType> {
  title: string;
  actionListItems: ActionListItem<TemplateFnReturnType>[];
}

export interface ActionListItem<TemplateFnReturnType> {
  title?: string;
  warning?: boolean;
  divider?: boolean;
  content?: TemplateFnReturnType;
}
