import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { ProfessorsRecords } from "./records";
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
                <CCardHeader className="fs-6">Todos los profesores</CCardHeader>
                <CCardBody>
                  <ProfessorsRecords />
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
