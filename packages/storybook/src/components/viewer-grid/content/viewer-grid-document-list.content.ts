import { AlertType, DocumentList, DocumentListItemStatusDemoContent } from "@dso-toolkit/sources";

import { documentListTemplate } from '@dso-toolkit/css/src/components/document-list/document-list.template';
import { viewerGridTemplate } from '@dso-toolkit/core/src/components/viewer-grid/viewer-grid.template';
import { alertTemplate } from '@dso-toolkit/core/src/components/alert/alert.template';

import { documentListStatusDemoContentMapper } from '../../document-list/document-list.content';

export function documentListExampleTemplate(documentList: DocumentList<DocumentListItemStatusDemoContent>) {
  return viewerGridTemplate({
    main: documentListTemplate({ items: documentList.items.map(item => ({ ...item, status: documentListStatusDemoContentMapper(item.status) })) }),
    map: alertTemplate({ message: 'Dit is de kaart', status: AlertType.Info })
  });
};
