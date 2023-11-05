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
import { CourseTypesTab, CoursesTab } from "./tabs";
import { messageHandler } from "src/components/helpers/";

const Courses = () => {
  const {
    courseTypeSuccessMessage,
    courseTypeErrorMessage,
    statusDataCourseType,
    courseErrorMessage,
    courseSuccessMessage,
    statusDataCourse,
  } = useSelector((state) => state.academic);

  const [tab, setTab] = useState("courses");

  // mensajes de las peticiones
  useEffect(() => {
    if (statusDataCourseType !== null) {
      messageHandler(
        courseTypeErrorMessage,
        courseTypeSuccessMessage,
        statusDataCourseType
      );
    } else {
      messageHandler(courseTypeErrorMessage);
    }
  }, [statusDataCourseType, courseTypeErrorMessage]);

  // mensajes de las peticiones (courses)
  useEffect(() => {
    if (statusDataCourse !== null) {
      messageHandler(
        courseErrorMessage,
        courseSuccessMessage,
        statusDataCourse
      );
    } else {
      messageHandler(courseErrorMessage);
    }
  }, [statusDataCourse, courseErrorMessage]);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-4 mb-3">Cursos / Materias</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Todos los cursos
                </CCardHeader>
                <CCardBody>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        role="button"
                        onClick={() => setTab("courses")}
                        active={tab === "courses"}
                        className={
                          tab === "courses" ? "text-success" : "text-dark"
                        }
                      >
                        Cursos
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        role="button"
                        onClick={() => setTab("courseTypes")}
                        active={tab === "courseTypes"}
                        className={
                          tab === "courseTypes" ? "text-success" : "text-dark"
                        }
                      >
                        Tipos de curso
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  {tab === "courseTypes" ? <CourseTypesTab /> : <></>}
                  {tab === "courses" ? <CoursesTab /> : <></>}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default Courses;
