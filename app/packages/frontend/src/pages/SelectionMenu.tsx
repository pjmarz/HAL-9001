import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectionMenu.css";

const SelectionMenu: FunctionComponent = () => {
  const navigate = useNavigate();

  const onButtonContainerClick = useCallback(() => {
    navigate("/lights-control-panel");
  }, [navigate]);

  const onButtonContainer1Click = useCallback(() => {
    navigate("/spotify-menu");
  }, [navigate]);

  const onButtonContainer2Click = useCallback(() => {
    navigate("/update-database");
  }, [navigate]);

  const onHAL9001LogoImage1Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="selection-menu">
      <div className="background-logo">
        <img
          className="hal-9001-logo-icon"
          alt=""
          src="/hal9001-logo2@2x.png"
        />
      </div>
      <div className="button" onClick={onButtonContainerClick}>
        <div className="control-lights">Control Lights</div>
      </div>
      <div className="button1" onClick={onButtonContainer1Click}>
        <div className="spotify">Spotify</div>
      </div>
      <div className="button2" onClick={onButtonContainer2Click}>
        <div className="update-database">Update Database</div>
      </div>
      <img
        className="hal-9001-logo-icon1"
        alt=""
        src="/hal9001-logo3@2x.png"
        onClick={onHAL9001LogoImage1Click}
      />
    </div>
  );
};

export default SelectionMenu;
