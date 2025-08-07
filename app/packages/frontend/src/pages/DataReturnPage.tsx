import { FunctionComponent, useCallback, useMemo } from "react";
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

  const bottle = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("hal9001_identifiedBottle");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, []);

  const name = bottle?.data?.name || "Jack Daniel's Old No. 7 Tennessee Whiskey";
  const maker = bottle?.data?.maker || "Jack Daniel’s";
  const abv = bottle?.data?.abv || "40%";
  const msrp = bottle?.data?.msrp || "$26.99";

  return (
    <div className="data-return-page">
      <div className="title-text1">Bottle Identified</div>
      <div className="camera-frame" />
      <img className="image-1-icon" alt="" src="/image-1@2x.png" />
      <div className="name-jack-daniels-container">
        <p className="name-jack-daniels">Name: {name}</p>
        <p className="name-jack-daniels">Maker: {maker}</p>
        <p className="name-jack-daniels">ABV: {abv}</p>
        <p className="name-jack-daniels">MSRP: {msrp}</p>
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
