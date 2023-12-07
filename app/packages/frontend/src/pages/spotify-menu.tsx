import React from "react";
import "./spotify-menu.module.css";

export const SpotifyMenu = (): JSX.Element => {
  return (
    <div className="spotify-menu">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="background-logo">
            <img className="HAL-logo" alt="Hal logo" src="HAL-9001-logo.png" />
          </div>
          <img className="img" alt="Hal logo" src="image.png" />
        </div>
      </div>
    </div>
  );
};
