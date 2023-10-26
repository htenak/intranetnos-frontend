import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { SchedulesTab } from "./tabs";
import { getAllCareers, getAllClasses } from "src/store";

const Schedules = () => {
  const dispatch = useDispatch();
  const { classes, scheduleSuccessMessage, scheduleErrorMessage } = useSelector(
    (state) => state.classes
  );
  const { careers, cycles } = useSelector((state) => state.academic);

  const [rows, setRows] = useState([]);

  // consulta todas las clases existentes
  useEffect(() => {
    dispatch(getAllClasses());
    dispatch(getAllCareers());
  }, []);

  const onClickTab = (id) => {
    localStorage.setItem("tabScheduleCareer", id);
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-4 mb-3">Horarios</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Todos lo horarios
                </CCardHeader>
                <CCardBody>
                  <CNav variant="tabs">
                    {careers && careers.length !== 0 ? (
                      <>
                        {careers.map((c) => (
                          <CNavItem key={c.id?.id}>
                            <CNavLink
                              role="button"
                              onClick={() => onClickTab(c.id)}
                              active={
                                localStorage.getItem("tabScheduleCareer") ==
                                c.id
                              }
                              className={
                                localStorage.getItem("tabScheduleCareer") ==
                                c.id
                                  ? "text-success"
                                  : "text-dark"
                              }
                            >
                              {c.name}
                            </CNavLink>
                          </CNavItem>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </CNav>
                  {/* {tab === "schedules" ? <SchedulesTab /> : <></>} */}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default Schedules;
