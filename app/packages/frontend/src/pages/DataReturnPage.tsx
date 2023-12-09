import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CheckIn from "../components/CheckIn";
import "./DataReturnPage.css";

const DataReturnPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const onCheckInContainerClick = useCallback(() => {
    navigate("/action-confirmation-page");
  }, [navigate]);

  const onComponent1Frame6Click = useCallback(() => {
    navigate("/update-database");
  }, [navigate]);

  const onHAL9001LogoImageClick = useCallback(() => {
    navigate("/selection-menu");
  }, [navigate]);

  return (
    <div className="data-return-page">
      <div className="title-text1">Bottle Identified</div>
      <div className="camera-frame" />
      <img className="image-1-icon" alt="" src="/image-1@2x.png" />
      <div className="name-jack-daniels-container">
        <p className="name-jack-daniels">
          Name: Jack Daniel's Old No. 7 Tennessee Whiskey 
        </p>
        <p className="name-jack-daniels">Maker: Jack Daniel’s </p>
        <p className="name-jack-daniels">ABV: 40% </p>
        <p className="name-jack-daniels">MSRP: $26.99</p>
      </div>
      <CheckIn
        checkInPadding="var(--padding-11xl) var(--padding-xl)"
        checkInPosition="absolute"
        checkInTop="328px"
        checkInLeft="452px"
        checkInCursor="pointer"
        checkInBackgroundColor="#1cc700"
        checkInTextFontSize="24px"
        onCheckInContainerClick={onCheckInContainerClick}
      />
      <img
        className="hal-9001-logo-icon3"
        alt=""
        src="/hal9001-logo1@2x.png"
        onClick={onHAL9001LogoImageClick}
      />
      <CheckIn
        checkInPadding="var(--padding-11xl) var(--padding-xl)"
        checkInPosition="absolute"
        checkInTop="328px"
        checkInLeft="625px"
        checkInCursor="pointer"
        checkInBackgroundColor="#dd0000"
        checkInTextFontSize="24px"
        onCheckInContainerClick={onComponent1Frame6Click}
      />
    </div>
  );
};

export default DataReturnPage;
