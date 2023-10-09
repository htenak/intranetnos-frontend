import React, { useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import { ROLE_ADMIN } from "src/constants";
import { getTotalsAcademic } from "src/store";

import Loader from "src/components/layout/loader/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { totals } = useSelector((state) => state.academic);

  useEffect(() => {
    dispatch(getTotalsAcademic());
  }, []);

  return (
    <>
      <CCard>
        <CCardBody>
          <h1 className="fs-4 mb-3">Menú principal</h1>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Vista previa de registros
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12}>
                      <div
                        style={{
                          height: "auto",
                          width: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <Loader show={!totals} center={true} />
                        {totals ? (
                          <CRow>
                            <CCol xs={12} md={4} className="mt-2 mb-2">
                              <div className="border-start border-start-5 border-start-success py-1 px-3">
                                <div className="text-medium-emphasis">
                                  Usuarios
                                </div>
                                <div className="fs-5 fw-semibold">
                                  {totals.totalUsers}
                                </div>
                              </div>
                            </CCol>
                            <CCol xs={12} md={4} className="mt-2 mb-2">
                              <div className="border-start border-start-5 border-start-dark py-1 px-3">
                                <div className="text-medium-emphasis">
                                  Administradores
                                </div>
                                <div className="fs-5 fw-semibold">
                                  {totals.totalAdmins}
                                </div>
                              </div>
                            </CCol>
                            <CCol xs={12} md={4} className="mt-2 mb-2">
                              <div className="border-start border-start-5 border-start-info py-1 px-3">
                                <div className="text-medium-emphasis">
                                  Profesores
                                </div>
                                <div className="fs-5 fw-semibold">
                                  {totals.totalProfessors}
                                </div>
                              </div>
                            </CCol>
                            <CCol xs={12} md={4} className="mt-2 mb-2">
                              <div className="border-start border-start-5 border-start-warning py-1 px-3">
                                <div className="text-medium-emphasis">
                                  Estudiantes
                                </div>
                                <div className="fs-5 fw-semibold">
                                  {totals.totalStudents}
                                </div>
                              </div>
                            </CCol>
                            <CCol xs={12} md={4} className="mt-2 mb-2">
                              <div className="border-start border-start-5 border-start-secondary py-1 px-3">
                                <div className="text-medium-emphasis">
                                  Carreras
                                </div>
                                <div className="fs-5 fw-semibold">
                                  {totals.totalCareers}
                                </div>
                              </div>
                            </CCol>
                            <CCol xs={12} md={4} className="mt-2 mb-2">
                              <div className="border-start border-start-5 border-start-danger py-1 px-3">
                                <div className="text-medium-emphasis">
                                  Cursos
                                </div>
                                <div className="fs-5 fw-semibold">
                                  {totals.totalCourses}
                                </div>
                              </div>
                            </CCol>
                          </CRow>
                        ) : (
                          <></>
                        )}
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
