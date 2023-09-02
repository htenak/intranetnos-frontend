import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span>&copy;2023 NOS Intranet, KanethDev.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Construido con </span>
        <a
          href="https://coreui.io/react"
          target="_blank"
          rel="noopener noreferrer"
        >
          CoreUI React
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
