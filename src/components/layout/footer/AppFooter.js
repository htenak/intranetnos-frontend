import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      <div className="w-100 text-center py-2">
        <span>&copy;2023 NOS Intranet v1.0.0</span>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
