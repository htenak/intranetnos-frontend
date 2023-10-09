import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { CourseTypesTab, CoursesTab } from "./tabs";

const Courses = () => {
  const {
    courseTypeSuccessMessage,
    courseTypeErrorMessage,
    courseErrorMessage,
    courseSuccessMessage,
  } = useSelector((state) => state.academic);

  const [tab, setTab] = useState("courses");

  // mensajes de las peticiones (courseTypes)
  useEffect(() => {
    if (courseTypeErrorMessage !== undefined) {
      toast.error(courseTypeErrorMessage);
    }
    if (courseTypeSuccessMessage !== undefined) {
      toast.success(courseTypeSuccessMessage);
    }
  }, [courseTypeErrorMessage, courseTypeSuccessMessage]);

  // mensajes de las peticiones (courses)
  useEffect(() => {
    if (courseErrorMessage !== undefined) {
      toast.error(courseErrorMessage);
    }
    if (courseSuccessMessage !== undefined) {
      toast.success(courseSuccessMessage);
    }
  }, [courseErrorMessage, courseSuccessMessage]);

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
