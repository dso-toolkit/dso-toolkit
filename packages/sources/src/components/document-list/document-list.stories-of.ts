import { createStories, noControl, StorybookParameters } from '../../storybook';

import { documentListMapper } from './document-list.args';
import { DocumentList, DocumentListItemStatusDemoContent } from './document-list.models';

export interface DocumentListParameters<TemplateFnReturnType> {
  documentListTemplate: (documentListProperties: DocumentList<TemplateFnReturnType>) => TemplateFnReturnType;
  statusDemoMap: (status: DocumentListItemStatusDemoContent) => TemplateFnReturnType
}

export function storiesOfDocumentList<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    documentListTemplate,
    statusDemoMap
  }: DocumentListParameters<TemplateFnReturnType>
) {
  const stories = createStories('Document List', parameters, {})
    .addParameters({
      args: {
        ...noControl
      }
    });

  stories.add(
    'Document List',
    () => documentListTemplate(documentListMapper(statusDemoMap))
  );
}
