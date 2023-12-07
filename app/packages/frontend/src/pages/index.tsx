import React from "react";
import "./style.css";

export const SelectionMenu = (): JSX.Element => {
  return (
    <div className="selection-menu">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="background-logo">
            <img className="HAL-logo" alt="Hal logo" src="HAL-9001-logo.png" />
          </div>
          <button className="button">
            <div className="text-wrapper">Control Lights</div>
          </button>
          <button className="div-wrapper">
            <div className="div">Spotify</div>
          </button>
          <button className="button-2">
            <div className="text-wrapper-2">Update Database</div>
          </button>
          <img className="img" alt="Hal logo" src="image.png" />
        </div>
      </div>
    </div>
  );
};
