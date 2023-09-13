import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

import { useSelector } from "react-redux";
import { ROLE_ADMIN } from "src/constants";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <CCard>
        <CCardBody>
          <h1 className="fs-4 mb-3">Menú principal</h1>
          {user.role.name === ROLE_ADMIN && (
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                    Vista previa de registros
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol xs={12} md={12} xl={12}>
                        <CRow>
                          <CCol md={4} xl={2}>
                            <div className="border-start border-start-5 border-start-success py-1 px-3">
                              <div className="text-medium-emphasis">
                                Usuarios
                              </div>
                              <div className="fs-5 fw-semibold">122</div>
                            </div>
                          </CCol>
                          <CCol md={4} xl={2}>
                            <div className="border-start border-start-5 border-start-dark py-1 px-3">
                              <div className="text-medium-emphasis">
                                Administrador
                              </div>
                              <div className="fs-5 fw-semibold">5</div>
                            </div>
                          </CCol>
                          <CCol md={4} xl={2}>
                            <div className="border-start border-start-5 border-start-info py-1 px-3">
                              <div className="text-medium-emphasis">
                                Profesores
                              </div>
                              <div className="fs-5 fw-semibold">7</div>
                            </div>
                          </CCol>
                          <CCol md={4} xl={2}>
                            <div className="border-start border-start-5 border-start-warning py-1 px-3">
                              <div className="text-medium-emphasis">
                                Estudiantes
                              </div>
                              <div className="fs-5 fw-semibold">110</div>
                            </div>
                          </CCol>
                          <CCol md={4} xl={2}>
                            <div className="border-start border-start-5 border-start-secondary py-1 px-3">
                              <div className="text-medium-emphasis">
                                Carreras
                              </div>
                              <div className="fs-5 fw-semibold">10</div>
                            </div>
                          </CCol>
                          <CCol md={4} xl={2}>
                            <div className="border-start border-start-5 border-start-danger py-1 px-3">
                              <div className="text-medium-emphasis">Cursos</div>
                              <div className="fs-5 fw-semibold">43</div>
                            </div>
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
