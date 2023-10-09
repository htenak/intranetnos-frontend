import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span>&copy;2023 NOS Intranet v1.0.0</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Desarrollado por </span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          KanethDev
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
