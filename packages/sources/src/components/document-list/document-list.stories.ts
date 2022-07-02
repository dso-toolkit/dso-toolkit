import { StorybookParameters } from "../../stories-helpers";

import { documentListMapper } from './document-list.args';
import { DocumentList, DocumentListItemStatusDemoContent } from './document-list.models';

export interface DocumentListParameters<TemplateFnReturnType> {
  documentListTemplate: (documentListProperties: DocumentList<TemplateFnReturnType>) => TemplateFnReturnType;
  statusDemoMap: (status: DocumentListItemStatusDemoContent) => TemplateFnReturnType
}

export function storiesOfDocumentList<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    documentListTemplate,
    statusDemoMap
  }: DocumentListParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Document List', mainModule)
    .addParameters({
      docs: {
        page: readme,
      }
    });

  stories.add(
    'Document List',
    () => documentListTemplate(documentListMapper(statusDemoMap))
  );
}
