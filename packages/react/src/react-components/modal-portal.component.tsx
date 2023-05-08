import * as React from "react";
import ReactDOM from "react-dom";

export function DsoModalPortal({ children }: { children: React.ReactNode }) {
  return <>{ReactDOM.createPortal(children, document.body)}</>;
}
