import React, { useState } from "react";
import { CCard, CCardBody, CNav, CNavItem, CNavLink } from "@coreui/react";
import { ClassesProfessor, OtherClassesProfessor } from "./tabs";

const PClasses = () => {
  const [tab, setTab] = useState("pclasses");

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink
                role="button"
                onClick={() => setTab("pclasses")}
                active={tab === "pclasses"}
                className={tab === "pclasses" ? "text-success" : "text-dark"}
              >
                Mis clases
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                role="button"
                onClick={() => setTab("potherclasses")}
                active={tab === "potherclasses"}
                className={
                  tab === "potherclasses" ? "text-success" : "text-dark"
                }
              >
                Otras clases
              </CNavLink>
            </CNavItem>
          </CNav>
          {tab === "pclasses" ? <ClassesProfessor /> : <></>}
          {tab === "potherclasses" ? <OtherClassesProfessor /> : <></>}
        </CCardBody>
      </CCard>
    </>
  );
};
export default PClasses;
