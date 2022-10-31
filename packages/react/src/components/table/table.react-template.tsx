import { Table } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoTable } from '../..';
import { ComponentImplementation } from '../../templates';

export const reactTable: ComponentImplementation<Table<JSX.Element>> = {
  component: 'table',
  implementation: 'react',
  template: () => function tableTemplate({ noModal, content }) {
    return (
      <DsoTable
        noModal={noModal}
      >
        <table className="table">
          <caption className="sr-only">{content.caption}</caption>

          <thead>
            <tr>
              {content.head.map(col => <th scope="col" key={col} dangerouslySetInnerHTML={{ __html: col }}></th>)}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row, index) =>
              <tr key={index}>
                {row.map((col, cellIndex) => index === 0
                  ? <th key={cellIndex} scope="row" dangerouslySetInnerHTML={{ __html: col }}></th>
                  : <td key={cellIndex} dangerouslySetInnerHTML={{ __html: col }}></td>
                )}
              </tr>
            )}
          </tbody>
        </table>

      </DsoTable>

    );
  }
};
