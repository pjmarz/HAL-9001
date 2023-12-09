import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome: FunctionComponent = () => {
  const navigate = useNavigate();

  const onStartButtonContainerClick = useCallback(() => {
    navigate("/selection-menu");
  }, [navigate]);

  return (
    <button className="welcome">
      <div className="background-logo5">
        <img
          className="hal-9001-logo-icon11"
          alt=""
          src="/hal9001-logo@2x.png"
        />
        <div className="hal-9001-text">HAL-9001</div>
      </div>
      <div className="start-button" onClick={onStartButtonContainerClick}>
        <div className="frame">
          <div className="begin">Begin</div>
        </div>
      </div>
    </button>
  );
};

export default Welcome;
