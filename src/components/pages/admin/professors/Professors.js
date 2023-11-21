import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
} from "@coreui/react";
import { ProfessorsTab } from "./tabs";
import { messageHandler } from "src/components/helpers";

const Professors = () => {
  const { successMessage, errorMessage, statusDataProfessor } = useSelector(
    (state) => state.professors
  );

  const [tab, setTab] = useState("professors");

  // mensajes de las peticiones
  useEffect(() => {
    if (statusDataProfessor !== null) {
      messageHandler(errorMessage, successMessage, statusDataProfessor);
    } else {
      messageHandler(errorMessage);
    }
  }, [errorMessage, statusDataProfessor]);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-5 mb-3">Profesores</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Todos los profesores
                </CCardHeader>
                <CCardBody>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        role="button"
                        onClick={() => setTab("professors")}
                        active={tab === "professors"}
                        className={
                          tab === "professors" ? "text-success" : "text-dark"
                        }
                      >
                        Profesores
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  {tab === "professors" ? <ProfessorsTab /> : <></>}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default Professors;
