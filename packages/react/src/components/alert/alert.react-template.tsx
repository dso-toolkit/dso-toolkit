import { Alert } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoAlert } from '../..';
import { ComponentImplementation } from '../../templates';

export const reactAlert: ComponentImplementation<Alert<JSX.Element>> = {
  component: 'alert',
  implementation: 'react',
  template: () => function alertTemplate({
    message,
    onClick,
    status,
    withRoleAlert
  }) {
    return (
      <DsoAlert
        status={status}
        roleAlert={withRoleAlert}
      >
        <div className="dso-rich-content">
          {typeof message === 'string'
            ? (
              <p dangerouslySetInnerHTML={({ __html: message })} />
            )
            : message
          }
          {onClick && (
            <button type="button" className="btn" onClick={e => onClick(e.nativeEvent)}>Button</button>
          )}
        </div>
      </DsoAlert>
    );
  }
}
