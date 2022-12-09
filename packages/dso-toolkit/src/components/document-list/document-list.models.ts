import { Badge } from "../badge/badge.models.js";

export interface DocumentList<TemplateFnReturnType> {
  items: DocumentListItem<TemplateFnReturnType>[];
}

export interface DocumentListItem<TemplateFnReturnType> {
  title: string;
  type: string;
  owner: string;
  status: TemplateFnReturnType;
}

export interface DocumentListItemStatusDemoContent {
  badge: Badge;
  date: string;
}
