import { Banner } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoBanner } from '../..';
import { iconTemplate } from '../icon/icon.template';

export function bannerTemplate({
  status,
  richContent,
  onClick
}: Banner<JSX.Element>) {
  return (
    <DsoBanner
      status={status}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {richContent}
            <button type="button" className="dso-tertiary" onClick={e => onClick(e.nativeEvent)}>
              <span className="sr-only">Sluiten</span>
              {iconTemplate({ icon: 'times' })}
            </button>
          </div>
        </div>
      </div>
    </DsoBanner>
  );
}
