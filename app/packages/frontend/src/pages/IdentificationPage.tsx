import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import State1Icon from "../components/State1Icon";
import "./IdentificationPage.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3001";

const IdentificationPage: FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;

    async function identifyBottle() {
      try {
        const resp = await fetch(`${API_BASE}/api/identify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        const json = await resp.json();
        if (!isCancelled) {
          sessionStorage.setItem(
            "hal9001_identifiedBottle",
            JSON.stringify(json)
          );
        }
      } catch (err) {
        if (!isCancelled) {
          sessionStorage.setItem(
            "hal9001_identifiedBottle",
            JSON.stringify({ ok: false, error: (err as Error).message })
          );
        }
      } finally {
        if (!isCancelled) {
          setTimeout(() => navigate("/data-return-page"), 800);
        }
      }
    }

    identifyBottle();

    return () => {
      isCancelled = true;
    };
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
      <div className="title-text2">Scanning bottle...</div>
      <div className="camera-frame1" />
      <img className="image-1-icon1" alt="" src="/image-1@2x.png" />
      <State1Icon
        state1IconState1="/loader-anim.svg"
        state1IconWidth="150px"
        state1IconHeight="150px"
        state1IconPosition="absolute"
        state1IconTop="calc(50% - 75px)"
        state1IconLeft="525px"
      />
    </div>
  );
};

export default IdentificationPage;
