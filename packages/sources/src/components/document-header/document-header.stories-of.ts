import { HandlerFunction } from '@storybook/addon-actions';

import { noControl } from '../../storybook';
import { storiesOfFactory } from '../../storybook/stories-of-factory';
import { DefinitionList } from '../definition-list/definition-list.models';

import { DocumentHeaderArgs, documentHeaderArgsMapper } from './document-header.args';
import { DocumentHeader } from './document-header.models';

export interface DocumentHeaderTemplates<TemplateFnReturnType> {
  documentHeaderTemplate: (documentHeaderProperties: DocumentHeader<TemplateFnReturnType>) => TemplateFnReturnType;
  status: (documentHeaderFeatureOpen: boolean, documentHeaderFeatureAction: HandlerFunction) => TemplateFnReturnType;
  features: DefinitionList<TemplateFnReturnType>;
  statusContent: TemplateFnReturnType;
}

export const storiesOfDocumentHeader = storiesOfFactory<DocumentHeaderTemplates<any>, DocumentHeaderArgs>('Document Header', (stories, templateMapper) => {
  stories.addParameters({
    args: {
      ...noControl
    }
  });

  const template = templateMapper((args, { documentHeaderTemplate, features, status, statusContent }) => documentHeaderTemplate(documentHeaderArgsMapper(args, status(args.featuresOpen, args.featureAction), features, statusContent)));

  stories.add(
    'Document Header',
    template
  );
});
