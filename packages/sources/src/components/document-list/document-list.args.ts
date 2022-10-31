import { documentListContent } from "./document-list.content";
import { DocumentList, DocumentListItemStatusDemoContent } from "./document-list.models";

export function documentListMapper<TemplateFnReturnType>(
  demoMapper: ({ badge, date }: DocumentListItemStatusDemoContent) => TemplateFnReturnType
): DocumentList<TemplateFnReturnType> {
  return {
    items: documentListContent.items.map((c) => ({ ...c, status: demoMapper(c.status) })),
  };
}
