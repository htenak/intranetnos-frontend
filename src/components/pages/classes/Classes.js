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
import { ClassesTab } from "./tabs";

const Classes = () => {
  const {
    classSuccessMessage,
    classErrorMessage,
    studentClassErrorMessage,
    studentClassSuccessMessage,
  } = useSelector((state) => state.classes);

  const [tab, setTab] = useState("classes");

  // mensajes de las peticiones
  useEffect(() => {
    if (classErrorMessage !== undefined) {
      toast.error(classErrorMessage);
    }
    if (classSuccessMessage !== undefined) {
      toast.success(classSuccessMessage);
    }
  }, [classSuccessMessage, classErrorMessage]);

  useEffect(() => {
    if (studentClassErrorMessage !== undefined) {
      toast.error(studentClassErrorMessage);
    }
    if (studentClassSuccessMessage !== undefined) {
      toast.success(studentClassSuccessMessage);
    }
  }, [studentClassErrorMessage, studentClassSuccessMessage]);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-4 mb-3">Clases</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Todas las clases
                </CCardHeader>
                <CCardBody>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        role="button"
                        onClick={() => setTab("classes")}
                        active={tab === "classes"}
                        className={
                          tab === "classes" ? "text-success" : "text-dark"
                        }
                      >
                        Clases
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  {tab === "classes" ? <ClassesTab /> : <></>}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default Classes;
