import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./ActionConfirmationPage.css";

const ActionConfirmationPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const onHAL9001LogoImageClick = useCallback(() => {
    navigate("/selection-menu");
  }, [navigate]);

  return (
    <div className="action-confirmation-page">
      <div className="title-text">
        <p className="jack-daniels-old">
          Jack Daniel's Old No. 7 Tennessee Whiskey
        </p>
        <p className="jack-daniels-old">
          Sucessfully Added/Removed from database!
        </p>
      </div>
      <img
        className="hal-9001-logo-icon1"
        alt=""
        src="/hal9001-logo1@2x.png"
        onClick={onHAL9001LogoImageClick}
      />
    </div>
  );
};

export default ActionConfirmationPage;
