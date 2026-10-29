import React from "react";
import ZustandBearIcon from "../common/ZustandBearIcon";

export default function RoadBearMarker({ stepIndex, totalSteps }) {
  return (
    <div className="road-bear-marker">
      <div className="bear-marker-pulse" />
      <div className="bear-marker-disc">
        <ZustandBearIcon size={20} className="bear-marker-icon" />
      </div>
      <div className="bear-marker-tag">
        <span className="bear-marker-text">Phase {stepIndex + 1} / {totalSteps}</span>
      </div>
    </div>
  );
}
