import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LightsControlPanel.css";

const LightsControlPanel: FunctionComponent = () => {
  const navigate = useNavigate();

  const onHAL9001LogoImage1Click = useCallback(() => {
    navigate("/selection-menu");
  }, [navigate]);

  return (
    <div className="lights-control-panel">
      <div className="background-logo3">
        <img
          className="hal-9001-logo-icon6"
          alt=""
          src="/hal9001-logo2@2x.png"
        />
      </div>
      <img
        className="hal-9001-logo-icon7"
        alt=""
        src="/hal9001-logo3@2x.png"
        onClick={onHAL9001LogoImage1Click}
      />
    </div>
  );
};

export default LightsControlPanel;
