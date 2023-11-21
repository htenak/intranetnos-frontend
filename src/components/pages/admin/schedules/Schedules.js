import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getAllCareers, getAllClasses, getAllDays } from "src/store";
import { messageHandler } from "src/components/helpers";

const Schedules = () => {
  const dispatch = useDispatch();
  const { scheduleSuccessMessage, scheduleErrorMessage, statusDataSchedule } =
    useSelector((state) => state.classes);
  const { careers } = useSelector((state) => state.academic);
  const [careerIdTab, setCareerIdTab] = useState(0);
  const [careerNameTab, setCareerNameTab] = useState("");

  // mensajes de las peticiones
  useEffect(() => {
    if (statusDataSchedule !== null) {
      messageHandler(
        scheduleErrorMessage,
        scheduleSuccessMessage,
        statusDataSchedule
      );
    } else {
      messageHandler(scheduleErrorMessage);
    }
  }, [scheduleErrorMessage, statusDataSchedule]);

  // consulta todas las clases existentes
  useEffect(() => {
    dispatch(getAllClasses());
    dispatch(getAllCareers());
    dispatch(getAllDays());
  }, []);

  // va guardando el careerIdtab en localStorage
  useEffect(() => {
    if (careerIdTab) {
      localStorage.setItem("careerIdTab", careerIdTab);
    }
  }, [careerIdTab]);

  // va guardando el careerNametab en localStorage
  useEffect(() => {
    if (careerNameTab) {
      localStorage.setItem("careerNameTab", careerNameTab);
    }
  }, [careerNameTab]);

  // asigna el tab si existe, sino asigna la primera carrera
  useEffect(() => {
    if (careers && careers.length !== 0) {
      if (localStorage.getItem("careerIdTab")) {
        setCareerIdTab(parseInt(localStorage.getItem("careerIdTab")));
        setCareerNameTab(localStorage.getItem("careerNameTab"));
        return;
      }
      setCareerIdTab(parseInt(careers[0].id));
      setCareerNameTab(careers[0].name || "hola");
    }
  }, [careers]);

  const onClickTab = (career) => {
    setCareerIdTab(parseInt(career.id));
    setCareerNameTab(career.name);
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-5 mb-3">Horarios</h1>
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
                          <CNavItem key={c.id}>
                            <CNavLink
                              role="button"
                              onClick={() => onClickTab(c)}
                              active={c.id === careerIdTab}
                              className={
                                c.id === careerIdTab
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
                  <SchedulesTab
                    careerIdTab={careerIdTab}
                    careerNameTab={careerNameTab}
                  />
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
