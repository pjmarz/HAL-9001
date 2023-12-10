import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateDatabase.css";

const UpdateDatabase: FunctionComponent = () => {
  const navigate = useNavigate();

  const onButtonContainerClick = useCallback(() => {
    navigate("/identification-page");
  }, [navigate]);

  const onButtonContainer1Click = useCallback(() => {
    navigate("/identification-page");
  }, [navigate]);

  const onHAL9001LogoImage1Click = useCallback(() => {
    navigate("/selection-menu");
  }, [navigate]);

  return (
    <div className="update-database1">
      <div className="background-logo2">
        <img
          className="hal-9001-logo-icon5"
          alt=""
          src="/hal9001-logo2@2x.png"
        />
        <div className="button3" onClick={onButtonContainerClick}>
          <div className="check-out-finished">Check out finished bottle</div>
        </div>
      </div>
      <div className="button4" onClick={onButtonContainer1Click}>
        <div className="check-in-new">Check in new bottle</div>
      </div>
      <img
        className="hal-9001-logo-icon6"
        alt=""
        src="/hal9001-logo3@2x.png"
        onClick={onHAL9001LogoImage1Click}
      />
    </div>
  );
};

export default UpdateDatabase;
