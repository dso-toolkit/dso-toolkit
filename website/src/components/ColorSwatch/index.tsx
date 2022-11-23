import React from "react";

import styles from "./styles.module.scss";

interface Props {
  label: string;
  name: string;
  rgb: string;
}

export function ColorSwatch({ label, name, rgb }: Props) {
  if (!styles[name]) {
    throw new Error(`No color exported for $${name}`);
  }

  return (
    <div>
      <h4>{label}</h4>
      <div style={{ backgroundColor: styles[name], width: "100%", height: "150px" }}></div>
      <p style={{ marginBottom: 0 }}>
        <code>{styles[name]}</code>
      </p>
      <p>
        <code>{rgb}</code>
      </p>
    </div>
  );
}
