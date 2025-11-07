import { FunctionComponent, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import State1Icon from "../components/State1Icon";
import { identifyBottle, BottleData } from "../services/api";
import "./IdentificationPage.css";

const IdentificationPage: FunctionComponent = () => {
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const capture = useCallback(async () => {
    if (!webcamRef.current) {
      setError("Camera not available");
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setError("Failed to capture image");
      return;
    }

    setIsScanning(true);
    setError(null);

    try {
      // Convert data URL to File
      const arr = imageSrc.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], "bottle-image.jpg", { type: mime });

      // Send to API for identification
      const bottleData: BottleData = await identifyBottle(file);

      // Navigate to data return page with bottle data
      navigate("/data-return-page", { state: { bottleData } });
    } catch (err) {
      console.error("Error identifying bottle:", err);
      setError(err instanceof Error ? err.message : "Failed to identify bottle");
      setIsScanning(false);
    }
  }, [navigate]);

  return (
    <div className="identification-page">
      <div className="background-logo1">
        <img
          className="hal-9001-logo-icon4"
          alt=""
          src="/hal9001-logo2@2x.png"
        />
      </div>
      <div className="title-text2">
        {isScanning ? "Scanning bottle..." : "Position bottle in frame"}
      </div>
      <div className="camera-frame1">
        {!isScanning ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "environment", // Use back camera on mobile
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <State1Icon
              state1IconState1="/loader-anim.svg"
              state1IconWidth="150px"
              state1IconHeight="150px"
              state1IconPosition="relative"
              state1IconTop="0"
              state1IconLeft="0"
            />
          </div>
        )}
      </div>
      {error && (
        <div style={{
          position: "absolute",
          top: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#dd0000",
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "10px 20px",
          borderRadius: "5px",
          zIndex: 1000,
        }}>
          {error}
        </div>
      )}
      {!isScanning && (
        <button
          onClick={capture}
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "15px 30px",
            fontSize: "18px",
            backgroundColor: "#1cc700",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          Capture & Identify
        </button>
      )}
    </div>
  );
};

export default IdentificationPage;
