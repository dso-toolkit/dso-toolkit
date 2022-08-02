import { HandlerFunction } from '@storybook/addon-actions';
import { Args } from '@storybook/addons';

import { noControl, StorybookParameters } from '../../stories-helpers';
import { DefinitionList } from '../definition-list/definition-list.models';

import { DocumentHeaderArgs, documentHeaderMapper } from './document-header.args';
import { DocumentHeader } from './document-header.models';

export interface DocumentHeaderParameters<TemplateFnReturnType> {
  documentHeaderTemplate: (documentHeaderProperties: DocumentHeader<TemplateFnReturnType>) => TemplateFnReturnType;
  status: (documentHeaderFeatureOpen: boolean, documentHeaderFeatureAction: HandlerFunction) => TemplateFnReturnType;
  features: DefinitionList<TemplateFnReturnType>;
  statusContent: TemplateFnReturnType;
}

export function storiesOfDocumentHeader<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    documentHeaderTemplate,
    status,
    features,
    statusContent
  }: DocumentHeaderParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Document Header', mainModule)
    .addParameters({
      docs: {
        page: readme,
      },
      args: {
        ...noControl
      }
    });

  stories.add(
    'Document Header',
    (a: Args) => {
      const args = a as DocumentHeaderArgs;

      return documentHeaderTemplate(documentHeaderMapper(args, status(args.featuresOpen, args.featureAction), features, statusContent));
    }
  );
}
