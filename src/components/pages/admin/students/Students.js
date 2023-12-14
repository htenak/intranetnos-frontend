import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { StudentsRecords } from "./records";
import { messageHandler } from "src/components/helpers";

const Students = () => {
  const { successMessage, errorMessage, statusDataStudent } = useSelector(
    (state) => state.students
  );

  const [tab, setTab] = useState("students");

  // mensajes de las peticiones
  useEffect(() => {
    if (statusDataStudent !== null) {
      messageHandler(errorMessage, successMessage, statusDataStudent);
    } else {
      messageHandler(errorMessage);
    }
  }, [errorMessage, statusDataStudent]);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-5 mb-3">Estudiantes</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader className="fs-6">
                  Todos los estudiantes
                </CCardHeader>
                <CCardBody>
                  <StudentsRecords />
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
