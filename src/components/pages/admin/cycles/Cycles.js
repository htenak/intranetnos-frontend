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
import { CyclesTab } from "./tabs";
import { messageHandler } from "src/components/helpers/";

const Cycles = () => {
  const { cycleSuccessMessage, cycleErrorMessage, statusDataCycle } =
    useSelector((state) => state.academic);

  const [tab, setTab] = useState("cycles");

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
          <h1 className="fs-4 mb-3">Ciclos</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Todos los ciclos
                </CCardHeader>
                <CCardBody>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        role="button"
                        onClick={() => setTab("cycles")}
                        active={tab === "cycles"}
                        className={
                          tab === "cycles" ? "text-success" : "text-dark"
                        }
                      >
                        Ciclos
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  {tab === "cycles" ? <CyclesTab /> : <></>}
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
