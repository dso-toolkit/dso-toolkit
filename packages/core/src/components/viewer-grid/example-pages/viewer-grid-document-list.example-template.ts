import { AlertType, DocumentList, DocumentListItemStatusDemoContent } from "@dso-toolkit/sources";

import { documentListStatusDemoContentMapper } from '@dso-toolkit/css/src/components/document-list/document-list.mapper';
import { documentListTemplate } from '@dso-toolkit/css/src/components/document-list/document-list.template';

import { alertTemplate } from "../../alert/alert.template";
import { viewerGridTemplate } from '../templates/viewer-grid.template';

export function viewerGridDocumentListExampleTemplate(documentList: DocumentList<DocumentListItemStatusDemoContent>) {
  return viewerGridTemplate({
    main: documentListTemplate({ items: documentList.items.map(item => ({ ...item, status: documentListStatusDemoContentMapper(item.status) })) }),
    map: alertTemplate({ message: 'Dit is de kaart', status: AlertType.Info })
  });
};
