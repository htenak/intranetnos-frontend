import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { messageHandler } from "src/components/helpers/";
import { ClassesRecords } from "./records";

const Classes = () => {
  const {
    classSuccessMessage,
    classErrorMessage,
    statusDataClass,
    studentClassErrorMessage,
    studentClassSuccessMessage,
    statusDataStudentClass,
  } = useSelector((state) => state.classes);

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
          <h1 className="fs-5 mb-3">Clases</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader className="fs-6">Todas las clases</CCardHeader>
                <CCardBody>
                  <ClassesRecords />
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
