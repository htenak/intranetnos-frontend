import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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

const Professors = () => {
  const { successMessage, errorMessage } = useSelector(
    (state) => state.professors
  );

  const [tab, setTab] = useState("professors");

  // mensajes de las peticiones
  useEffect(() => {
    if (errorMessage !== undefined) {
      toast.error(errorMessage);
    }
    if (successMessage !== undefined) {
      toast.success(successMessage);
    }
  }, [errorMessage, successMessage]);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-4 mb-3">Profesores</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Lista de todos los profesores
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
