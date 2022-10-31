import { noControl } from '../../storybook';
import { StoriesOfArguments, storiesOfFactory } from '../../storybook/stories-of-factory';

import { documentListMapper } from './document-list.args';
import { DocumentList, DocumentListItemStatusDemoContent } from './document-list.models';

export interface DocumentListTemplates<TemplateFnReturnType> {
  documentListTemplate: (documentListProperties: DocumentList<TemplateFnReturnType>) => TemplateFnReturnType;
  statusDemoMap: (status: DocumentListItemStatusDemoContent) => TemplateFnReturnType
}

export function storiesOfDocumentList<Implementation, Templates, TemplateFnReturnType>(storiesOfArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, DocumentListTemplates<TemplateFnReturnType>>) {
  return storiesOfFactory('Document List', storiesOfArguments, (stories, templateMapper) => {
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
}
