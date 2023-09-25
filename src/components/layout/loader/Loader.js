import React from "react";

import gifLoading from "../../../assets/images/loading.gif";
const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "280px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img src={gifLoading} style={{}} />
    </div>
  );
};
export default Loader;
