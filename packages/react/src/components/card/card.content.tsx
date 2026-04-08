import { InfoButton } from "dso-toolkit";
import React from "react";

export const content = <p>Gemeente Nieuwegein informeert haar burgers graag over de Omgevingswet.</p>;

export const infoButton: InfoButton<React.JSX.Element> = {
  label: 'Toon informatie over het "Omgevingsplan Nieuwegein"',
  children: (
    <div className="dso-rich-content">
      <p>Extra informatie over het "Omgevingsplan Nieuwegein"</p>
    </div>
  ),
  toggletipPlacement: "left",
};
