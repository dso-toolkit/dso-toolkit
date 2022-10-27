import { noControl } from '../../storybook';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { documentListMapper } from './document-list.args';
import { DocumentList, DocumentListItemStatusDemoContent } from './document-list.models';

export interface DocumentListTemplates<TemplateFnReturnType> {
  documentListTemplate: (documentListProperties: DocumentList<TemplateFnReturnType>) => TemplateFnReturnType;
  statusDemoMap: (status: DocumentListItemStatusDemoContent) => TemplateFnReturnType
}

export const storiesOfDocumentList = storiesOfFactory<DocumentListTemplates<any>, unknown>('Document List', (stories, templateMapper) => {
  stories.addParameters({
    args: {
      ...noControl
    }
  })

  const template = templateMapper((_args, { documentListTemplate, statusDemoMap }) => documentListTemplate(documentListMapper(statusDemoMap)));

  stories.add(
    'Document List',
    template
  );
});
