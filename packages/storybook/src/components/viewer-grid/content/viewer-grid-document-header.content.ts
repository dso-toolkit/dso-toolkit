import { AlertType } from "@dso-toolkit/sources";
import { ViewerGridDocumentHeaderProperties } from "@dso-toolkit/sources";

import { documentHeaderTemplate } from '@dso-toolkit/css/src/components/document-header/document-header.template';
import { viewerGridTemplate } from '@dso-toolkit/core/src/components/viewer-grid/viewer-grid.template';
import { alertTemplate } from '@dso-toolkit/core/src/components/alert/alert.template';

import { status, features, statusContent } from '../../document-header/document-header.content';

export function documentHeaderExampleTemplate({
  documentHeaderFeaturesOpen,
  documentHeaderFeatureAction,
  documentHeaderStatusOpen
}: ViewerGridDocumentHeaderProperties) {
  return viewerGridTemplate({
    main: documentHeaderTemplate({
      title: 'Omgevingsplan gemeente Gouda',
      type: 'Een omgevingsplan waar de omgeving mooier van wordt',
      owner: 'Gemeente Gouda',
      features,
      featureAction: documentHeaderFeatureAction,
      featuresOpen: documentHeaderFeaturesOpen,
      statusContentOpen: documentHeaderStatusOpen,
      status: status(documentHeaderFeaturesOpen, documentHeaderFeatureAction),
      statusContent
    }),
    map: alertTemplate({ message: 'Dit is de kaart', status: AlertType.Info })
  });
};
