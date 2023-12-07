import React from "react";
import "./index.module.css";

export const Welcome = (): JSX.Element => {
  return (
    <div className="welcome">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="background-logo">
            <div className="overlap-group">
              <div className="HAL-text">HAL-9001</div>
              <img className="HAL-logo" alt="Hal logo" src="HAL-9001-logo.png" />
            </div>
          </div>
          <div className="start-button">
            <div className="text-wrapper">Begin</div>
          </div>
        </div>
      </div>
    </div>
  );
};
