import React, { useEffect, useState } from "react";
import "./index.css";
import loadingImg from "./nos_logo.png";
const Loader = ({ show, center, isbd = true }) => {
  const [zindex, setZindex] = useState("10");
  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setZindex("-1");
      }, 1000);
    } else {
      setZindex("10");
    }
  }, [show]);
  return (
    <div
      className={`d-flex ${show ? "" : "hid-loader fadeOut"} ${
        center ? "align-items-center" : ""
      } justify-content-center loader position-absolute ${
        isbd ? "bg-white" : "bg-transparent"
      }`}
      style={{
        width: "100%",
        height: "100%",
        zIndex: zindex,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <img
        src={loadingImg}
        alt="img-loader"
        style={{
          zIndex: zindex,
          height: 100,
          width: 100,
          objectFit: "fill",
        }}
      ></img>
    </div>
  );
};
export default Loader;
