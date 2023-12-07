import { FunctionComponent, memo, useMemo, type CSSProperties } from "react";
import "./State1Icon.css";

type State1IconType = {
  state1IconState1?: string;

  /** Style props */
  state1IconWidth?: CSSProperties["width"];
  state1IconHeight?: CSSProperties["height"];
  state1IconPosition?: CSSProperties["position"];
  state1IconTop?: CSSProperties["top"];
  state1IconLeft?: CSSProperties["left"];
};

const State1Icon: FunctionComponent<State1IconType> = memo(
  ({
    state1IconState1,
    state1IconWidth,
    state1IconHeight,
    state1IconPosition,
    state1IconTop,
    state1IconLeft,
  }) => {
    const state1IconStyle: CSSProperties = useMemo(() => {
      return {
        width: state1IconWidth,
        height: state1IconHeight,
        position: state1IconPosition,
        top: state1IconTop,
        left: state1IconLeft,
      };
    }, [
      state1IconWidth,
      state1IconHeight,
      state1IconPosition,
      state1IconTop,
      state1IconLeft,
    ]);

    return (
      <img
        className="state1-icon"
        alt=""
        src={state1IconState1}
        style={state1IconStyle}
      />
    );
  }
);

export default State1Icon;
