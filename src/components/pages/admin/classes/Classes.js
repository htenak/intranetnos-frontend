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
import { ClassesTab } from "./tabs";
import { messageHandler } from "src/components/helpers/";

const Classes = () => {
  const {
    classSuccessMessage,
    classErrorMessage,
    statusDataClass,
    studentClassErrorMessage,
    studentClassSuccessMessage,
    statusDataStudentClass,
  } = useSelector((state) => state.classes);

  const [tab, setTab] = useState("classes");

  // mensajes de las peticiones
  useEffect(() => {
    if (statusDataClass !== null) {
      messageHandler(classErrorMessage, classSuccessMessage, statusDataClass);
    } else {
      messageHandler(classErrorMessage);
    }
  }, [statusDataClass, classErrorMessage]);

  // mensajes de las peticiones
  useEffect(() => {
    if (statusDataStudentClass !== null) {
      messageHandler(
        studentClassErrorMessage,
        studentClassSuccessMessage,
        statusDataStudentClass
      );
    } else {
      messageHandler(studentClassErrorMessage);
    }
  }, [statusDataStudentClass, studentClassErrorMessage]);

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
                  {/* POR HACER: cambiar por tabs de aulas */}
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
