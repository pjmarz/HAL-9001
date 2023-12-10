import { FunctionComponent, memo, useMemo, type CSSProperties } from "react";
import "./CheckIn.css";

type CheckInType = {
  /** Style props */
  checkInPadding?: CSSProperties["padding"];
  checkInPosition?: CSSProperties["position"];
  checkInTop?: CSSProperties["top"];
  checkInLeft?: CSSProperties["left"];
  checkInCursor?: CSSProperties["cursor"];
  checkInBackgroundColor?: CSSProperties["backgroundColor"];
  checkInTextFontSize?: CSSProperties["fontSize"];

  /** Action props */
  onCheckInContainerClick?: () => void;
};

const CheckIn: FunctionComponent<CheckInType> = memo(
  ({
    checkInPadding,
    checkInPosition,
    checkInTop,
    checkInLeft,
    checkInCursor,
    checkInBackgroundColor,
    checkInTextFontSize,
    onCheckInContainerClick,
  }) => {
    const checkInStyle: CSSProperties = useMemo(() => {
      return {
        padding: checkInPadding,
        position: checkInPosition,
        top: checkInTop,
        left: checkInLeft,
        cursor: checkInCursor,
        backgroundColor: checkInBackgroundColor,
      };
    }, [
      checkInPadding,
      checkInPosition,
      checkInTop,
      checkInLeft,
      checkInCursor,
      checkInBackgroundColor,
    ]);

    const checkInTextStyle: CSSProperties = useMemo(() => {
      return {
        fontSize: checkInTextFontSize,
      };
    }, [checkInTextFontSize]);

    return (
      <div
        className="check-in"
        style={checkInStyle}
        onClick={onCheckInContainerClick}
      >
        <div className="check-in-text" style={checkInTextStyle}>
          <p className="new-bottle">Check in</p>
          <p className="new-bottle">new Bottle</p>
        </div>
      </div>
    );
  }
);

export default CheckIn;
