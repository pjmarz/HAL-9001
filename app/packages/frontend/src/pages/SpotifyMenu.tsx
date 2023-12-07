import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SpotifyMenu.css";

const SpotifyMenu: FunctionComponent = () => {
  const navigate = useNavigate();

  const onHAL9001LogoImage1Click = useCallback(() => {
    navigate("/selection-menu");
  }, [navigate]);

  return (
    <div className="spotify-menu">
      <div className="background-logo4">
        <img
          className="hal-9001-logo-icon8"
          alt=""
          src="/hal9001-logo2@2x.png"
        />
      </div>
      <img
        className="hal-9001-logo-icon9"
        alt=""
        src="/hal9001-logo3@2x.png"
        onClick={onHAL9001LogoImage1Click}
      />
    </div>
  );
};

export default SpotifyMenu;
