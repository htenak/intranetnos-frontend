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
import { CareersTab } from "./tabs";

const Careers = () => {
  const { careerSuccessMessage, careerErrorMessage } = useSelector(
    (state) => state.academic
  );

  const [tab, setTab] = useState("careers");

  // mensajes de las peticiones
  useEffect(() => {
    if (careerErrorMessage !== undefined) {
      toast.error(careerErrorMessage);
    }
    if (careerSuccessMessage !== undefined) {
      toast.success(careerSuccessMessage);
    }
  }, [careerErrorMessage, careerSuccessMessage]);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-4 mb-3">Carreras / Profesiones</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Todas las carreras
                </CCardHeader>
                <CCardBody>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        role="button"
                        onClick={() => setTab("careers")}
                        active={tab === "careers"}
                        className={
                          tab === "careers" ? "text-success" : "text-dark"
                        }
                      >
                        Carreras
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  {tab === "careers" ? <CareersTab /> : <></>}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default Careers;
