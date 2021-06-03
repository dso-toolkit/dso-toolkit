import { Alert, AlertWithHeadingsContent } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoAlert } from '../..';

export function alertTemplate({
  message,
  onClick,
  status,
  withRoleAlert
}: Alert<JSX.Element>) {
  return (
    <DsoAlert
      status={status as any}
      roleAlert={withRoleAlert}
    >
      <div className="dso-rich-content">
        {typeof message === 'string'
          ? (
            <p dangerouslySetInnerHTML={{ __html: message }}></p>
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

export function alertWithHeadingsTemplate({
  h2,
  h3,
  h4,
  h5,
  h6,
  content
}: AlertWithHeadingsContent) {
  return (
    <>
      <h2>{h2}</h2>
      <p>{content}</p>
      <h3>{h3}</h3>
      <p>{content}</p>
      <h4>{h4}</h4>
      <p>{content}</p>
      <h5>{h5}</h5>
      <p>{content}</p>
      <h6>{h6}</h6>
      <p>{content}</p>
    </>
  );
}
