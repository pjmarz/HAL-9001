import { FunctionComponent } from "react";
import State1Icon from "../components/State1Icon";
import "./IdentificationPage.css";

const IdentificationPage: FunctionComponent = () => {
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
