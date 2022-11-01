import { HandlerFunction } from '@storybook/addon-actions';
import { DefinitionList } from '../definition-list/definition-list.models';
import { DocumentHeader } from './document-header.models';
import { ArgTypes, noControl } from '../../storybook';

export interface DocumentHeaderArgs {
  title: string;
  owner: string;
  type: string;
  featureAction: HandlerFunction;
  featuresOpen: boolean;
  statusContentOpen: boolean;
  sticky: boolean;
}

export const documentHeaderArgTypes: ArgTypes<DocumentHeaderArgs> = {
  title: {
    control: {
      type: 'text',
    },
  },
  owner: {
    control: {
      type: 'text',
    },
  },
  type: {
    control: {
      type: 'text',
    },
  },
  featureAction: {
    ...noControl,
    action: 'dsoToggleSection',
  },
  featuresOpen: {
    control: {
      type: 'boolean',
    },
  },
  statusContentOpen: {
    control: {
      type: 'boolean',
    },
  },
  sticky: {
    control: {
      type: 'boolean',
    },
  }
};

export function documentHeaderArgsMapper<TemplateFnReturnType>(
  a: DocumentHeaderArgs,
  status: TemplateFnReturnType,
  features: DefinitionList<TemplateFnReturnType>,
  statusContent: TemplateFnReturnType
): DocumentHeader<TemplateFnReturnType> {
  return {
    title: a.title,
    owner: a.owner,
    status,
    type: a.type,
    features,
    featureAction: a.featureAction,
    featuresOpen: a.featuresOpen,
    statusContent,
    statusContentOpen: a.statusContentOpen,
    sticky: a.sticky
  };
}
