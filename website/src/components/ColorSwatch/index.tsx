import React from "react";

import styles from "./styles.module.scss";

interface Props {
  label: string;
  name: string;
  rgb: string;
  textcolor: string;
}

export function ColorSwatch({ label, name, rgb, textcolor }: Props) {
  if (!styles[name]) {
    throw new Error(`No color exported for $${name}`);
  }
  if (!styles[textcolor]) {
    throw new Error(`No color exported for $${textcolor}`);
  }

  return (
    <div
      style={{
        backgroundColor: styles[name],
        width: "150px",
        height: "150px",
        display: "inline-block",
        padding: "8px 8px",
        position: "relative",
      }}
    >
      <h4 style={{ color: styles[textcolor] }}>{label}</h4>
      <div style={{ color: styles[textcolor], bottom: "0px", position: "absolute" }}>
        <p style={{ marginBottom: 0 }}>{styles[name]}</p>
        <p style={{ marginBottom: 8 }}>{rgb}</p>
      </div>
    </div>
  );
}
