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
import { CareersTab, ClassroomsTab } from "./tabs";
import { messageHandler } from "src/components/helpers/";

const Careers = () => {
  const {
    careerSuccessMessage,
    careerErrorMessage,
    statusDataCareer,
    statusDataClassroom,
    classroomErrorMessage,
    classroomSuccessMessage,
    statusDataClassroomCareer,
    classroomCareerErrorMessage,
    classroomCareerSuccessMessage,
  } = useSelector((state) => state.academic);

  const [tab, setTab] = useState("careers");

  // mensajes de las peticiones (careers)
  useEffect(() => {
    if (statusDataCareer !== null) {
      messageHandler(
        careerErrorMessage,
        careerSuccessMessage,
        statusDataCareer
      );
    } else {
      messageHandler(careerErrorMessage);
    }
  }, [statusDataCareer, careerErrorMessage]);

  // mensajes de las peticiones (classrooms)
  useEffect(() => {
    if (statusDataClassroom !== null) {
      messageHandler(
        classroomErrorMessage,
        classroomSuccessMessage,
        statusDataClassroom
      );
    } else {
      messageHandler(classroomErrorMessage);
    }
  }, [statusDataClassroom, classroomErrorMessage]);

  // mensajes de las peticiones (classrooms careers)
  useEffect(() => {
    if (statusDataClassroomCareer !== null) {
      messageHandler(
        classroomCareerErrorMessage,
        classroomCareerSuccessMessage,
        statusDataClassroomCareer
      );
    } else {
      messageHandler(classroomCareerErrorMessage);
    }
  }, [statusDataClassroomCareer, classroomCareerErrorMessage]);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-4 mb-3">Carreras</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Todas las carreras
                </CCardHeader>
                <CCardBody>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        role="button"
                        onClick={() => setTab("careers")}
                        active={tab === "careers"}
                        className={
                          tab === "careers" ? "text-success" : "text-dark"
                        }
                      >
                        Carreras
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        role="button"
                        onClick={() => setTab("classrooms")}
                        active={tab === "classrooms"}
                        className={
                          tab === "classrooms" ? "text-success" : "text-dark"
                        }
                      >
                        Aulas
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  {tab === "careers" ? <CareersTab /> : <></>}
                  {tab === "classrooms" ? <ClassroomsTab /> : <></>}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default Careers;
