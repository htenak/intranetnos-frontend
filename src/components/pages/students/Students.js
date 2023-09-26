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
import { StudentsTab } from "./tabs";

const Students = () => {
  const { successMessage, errorMessage } = useSelector(
    (state) => state.students
  );

  const [tab, setTab] = useState("students");

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
          <h1 className="fs-4 mb-3">Estudiantes</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Lista de todos los estudiantes
                </CCardHeader>
                <CCardBody>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        role="button"
                        onClick={() => setTab("students")}
                        active={tab === "students"}
                        className={
                          tab === "students" ? "text-success" : "text-dark"
                        }
                      >
                        Estudiantes
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  {tab === "students" ? <StudentsTab /> : <></>}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default Students;
