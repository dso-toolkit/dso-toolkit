import * as React from "react";

import { DocumentList, DocumentListItem } from "@dso-toolkit/sources";
import { DsoResponsiveElement } from "../../components";

export function documentListTemplate({ items }: DocumentList<JSX.Element>) {
  function documentListItemTemplate({ title, type, owner, status }: DocumentListItem<JSX.Element>) {
    return (
      <div className="dso-document-list-item">
        <div className="dso-document-list-item-heading">
          <h2>{title}</h2>
          <div className="dso-document-list-item-container">
            <p className="dso-document-list-item-type">{type}</p>
            <p className="dso-document-list-item-owner">{owner}</p>
            <p className="dso-document-list-item-status">
              {status}
              <a href="#" className="dso-document-list-item-open-document">
                Hele document bekijken
              </a>
            </p>
          </div>
        </div>
        <div className="dso-document-list-item-content">
          <p>Hier komt vulling</p>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
            ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
            fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
            justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper
            nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
            Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius
            laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies
            nisi. Nam eget dui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DsoResponsiveElement>
      <ul className="dso-document-list">
        {items.map((item) => (
          <li>{documentListItemTemplate(item)}</li>
        ))}
      </ul>
    </DsoResponsiveElement>
  );
}
