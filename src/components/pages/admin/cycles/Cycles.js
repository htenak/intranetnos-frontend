import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { CyclesRecords } from "./records";
import { messageHandler } from "src/components/helpers/";

const Cycles = () => {
  const { cycleSuccessMessage, cycleErrorMessage, statusDataCycle } =
    useSelector((state) => state.academic);

  // mensajes de las peticiones
  useEffect(() => {
    if (statusDataCycle !== null) {
      messageHandler(cycleErrorMessage, cycleSuccessMessage, statusDataCycle);
    } else {
      messageHandler(cycleErrorMessage);
    }
  }, [statusDataCycle, cycleErrorMessage]);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-5 mb-3">Ciclos</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader className="fs-6">Todos los ciclos</CCardHeader>
                <CCardBody>
                  <CyclesRecords />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default Cycles;
