import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FAIcon } from "src/assets/icon/FAIcon";

const Roles = () => {
  const roles = [
    {
      name: "admin",
      description: "Rol de adminitrador en el sistema.",
      status: true,
    },
    {
      name: "professor",
      description: "Rol de profesor en el sistema.",
      status: true,
    },
    {
      name: "student",
      description: "Rol de estudiante en el sistema",
      status: true,
    },
    {
      name: "user",
      description: "Rol de usuario sin acciones en el sistema",
      status: false,
    },
  ];

  return (
    <>
      <CRow>
        <CCol xs>
          <h1 className="fs-4 mb-3">Roles</h1>
          <CCard>
            <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
              Lista de roles
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      Opciones
                    </CTableHeaderCell>
                    <CTableHeaderCell>Rol</CTableHeaderCell>
                    <CTableHeaderCell>Descripción</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Acciones
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Estado
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {roles.map((role, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <div className="text-center">
                          <CButton color="info" className="m-1 text-white">
                            <FAIcon customClass="icon" icon={faEdit} />
                          </CButton>
                          <CButton color="danger" className="m-1 text-white">
                            <FAIcon customClass="icon" icon={faTrash} />
                          </CButton>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{role.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{role.description}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>
                          <CButton color="primary">Ver acciones</CButton>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center text-white">
                        <div>
                          {role.status ? (
                            <div className="bg-success rounded p-1">En uso</div>
                          ) : (
                            <div className="bg-danger rounded p-1">Sin uso</div>
                          )}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default Roles;
