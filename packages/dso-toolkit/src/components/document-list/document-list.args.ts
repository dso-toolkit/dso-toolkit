import { documentListContent } from "./document-list.content.js";
import { DocumentList, DocumentListItemStatusDemoContent } from "./document-list.models.js";

export function documentListMapper<TemplateFnReturnType>(
  demoMapper: ({ badge, date }: DocumentListItemStatusDemoContent) => TemplateFnReturnType
): DocumentList<TemplateFnReturnType> {
  return {
    items: documentListContent.items.map((c) => ({ ...c, status: demoMapper(c.status) })),
  };
}
