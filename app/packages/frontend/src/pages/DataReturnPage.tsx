import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CheckIn from "../components/CheckIn";
import { checkInBottle, BottleData } from "../services/api";
import "./DataReturnPage.css";

const DataReturnPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bottleData, setBottleData] = useState<BottleData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get bottle data from navigation state
    const state = location.state as { bottleData?: BottleData };
    if (state?.bottleData) {
      setBottleData(state.bottleData);
    } else {
      // If no data, redirect back to identification page
      navigate("/identification-page");
    }
  }, [location, navigate]);

  const onCheckInContainerClick = useCallback(async () => {
    if (!bottleData) return;

    setIsLoading(true);
    setError(null);

    try {
      await checkInBottle(bottleData);
      navigate("/action-confirmation-page", {
        state: { bottleData, action: "added" }
      });
    } catch (err) {
      console.error("Error checking in bottle:", err);
      setError(err instanceof Error ? err.message : "Failed to check in bottle");
      setIsLoading(false);
    }
  }, [bottleData, navigate]);

  const onCancelClick = useCallback(() => {
    navigate("/update-database");
  }, [navigate]);

  const onHAL9001LogoImageClick = useCallback(() => {
    navigate("/selection-menu");
  }, [navigate]);

  if (!bottleData) {
    return (
      <div className="data-return-page">
        <div className="title-text1">Loading...</div>
      </div>
    );
  }

  return (
    <div className="data-return-page">
      <div className="title-text1">Bottle Identified</div>
      <div className="camera-frame" />
      {bottleData.image_url && (
        <img 
          className="image-1-icon" 
          alt="Bottle" 
          src={bottleData.image_url.startsWith('http') ? bottleData.image_url : `/api${bottleData.image_url}`}
        />
      )}
      <div className="name-jack-daniels-container">
        <p className="name-jack-daniels">
          Name: {bottleData.name || "Unknown"}
        </p>
        <p className="name-jack-daniels">Maker: {bottleData.maker || "Unknown"}</p>
        <p className="name-jack-daniels">
          ABV: {bottleData.abv ? `${bottleData.abv}%` : "N/A"}
        </p>
        <p className="name-jack-daniels">
          MSRP: {bottleData.msrp ? `$${bottleData.msrp.toFixed(2)}` : "N/A"}
        </p>
      </div>
      {error && (
        <div style={{
          position: "absolute",
          top: "200px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#dd0000",
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "10px 20px",
          borderRadius: "5px",
          zIndex: 1000,
        }}>
          {error}
        </div>
      )}
      <CheckIn
        checkInPadding="var(--padding-11xl) var(--padding-xl)"
        checkInPosition="absolute"
        checkInTop="328px"
        checkInLeft="452px"
        checkInCursor={isLoading ? "wait" : "pointer"}
        checkInBackgroundColor={isLoading ? "#888" : "#1cc700"}
        checkInTextFontSize="24px"
        onCheckInContainerClick={isLoading ? undefined : onCheckInContainerClick}
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
        onCheckInContainerClick={onCancelClick}
      />
    </div>
  );
};

export default DataReturnPage;
