import { documentListContent, documentListStickyContent } from "./document-list.content.js";
import { DocumentList, DocumentListItemStatusDemoContent } from "./document-list.models.js";

export function documentListMapper<TemplateFnReturnType>(
  demoMapper: ({ badge, date }: DocumentListItemStatusDemoContent) => TemplateFnReturnType,
): DocumentList<TemplateFnReturnType> {
  return {
    items: documentListContent.items.map((c) => ({ ...c, status: demoMapper(c.status) })),
  };
}

export function documentListStickyMapper<TemplateFnReturnType>(
  demoMapper: ({ badge, date }: DocumentListItemStatusDemoContent) => TemplateFnReturnType,
): DocumentList<TemplateFnReturnType> {
  return {
    items: documentListStickyContent.items.map((c) => ({ ...c, status: demoMapper(c.status) })),
  };
}
