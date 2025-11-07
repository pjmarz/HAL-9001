import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottleData } from "../services/api";
import "./ActionConfirmationPage.css";

const ActionConfirmationPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bottleData, setBottleData] = useState<BottleData | null>(null);
  const [action, setAction] = useState<string>("added");

  useEffect(() => {
    const state = location.state as { bottleData?: BottleData; action?: string };
    if (state?.bottleData) {
      setBottleData(state.bottleData);
      setAction(state.action || "added");
    }
  }, [location]);

  const onHAL9001LogoImageClick = useCallback(() => {
    navigate("/selection-menu");
  }, [navigate]);

  return (
    <div className="action-confirmation-page">
      <div className="title-text">
        <p className="jack-daniels-old">
          {bottleData?.name || "Bottle"}
        </p>
        <p className="jack-daniels-old">
          Successfully {action === "added" ? "Added" : "Removed"} from database!
        </p>
      </div>
      <img
        className="hal-9001-logo-icon2"
        alt=""
        src="/hal9001-logo1@2x.png"
        onClick={onHAL9001LogoImageClick}
      />
    </div>
  );
};

export default ActionConfirmationPage;
