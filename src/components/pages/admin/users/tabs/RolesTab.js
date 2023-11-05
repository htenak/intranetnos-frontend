import React, { useState } from "react";
import { CButton, CCol, CRow } from "@coreui/react";
import { useSelector } from "react-redux";
import DataGrid from "react-data-grid";

import Loader from "src/components/layout/loader/Loader";
import { FAIcon } from "src/assets/icon/FAIcon";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import { RoleDetail } from "../modals";

export const RolesTab = () => {
  const { roles } = useSelector((state) => state.users);

  const rolesDetails = [
    {
      role: "admin",
      detail:
        "Los usuarios administradores son los encargados de la creación de todos los recursos del sistema, ademas son responsables de la integridad y seguridad de los usuarios.",
      accessTo: "Tienen acceso a:",
      accessDetail: ["Todos los recursos"],
    },
    {
      role: "professor",
      detail:
        "Los usuarios profesores son los encargados de crear y gestionar las actividades para los estudiantes.",
      accessTo: "Tienen acceso a:",
      accessDetail: ["Clases", "Cursos", "Actividades", "Estudiantes"],
    },
    {
      role: "student",
      detail:
        "Los usuarios estudiantes son los participantes en las actividades que sus profesores les asignan.",
      accessTo: "Tienen acceso a:",
      accessDetail: ["Cursos", "Clases", "Actividades"],
    },
    {
      role: "user",
      detail:
        "El rol de usuario son para todos aquellos que no tienen ningun rol anterior asignado aún.",
      accessTo: "Tienen acceso a:",
      accessDetail: ["Ningún recurso"],
    },
  ];
  const [statusRoleModal, setStatusRoleModal] = useState(false);
  const [roleDetail, setRoleDetail] = useState({});

  const onClickDetailRole = (roleName) => {
    setRoleDetail(rolesDetails?.find((row) => row.role === roleName));
    setStatusRoleModal(true);
  };

  const hideModal = () => {
    setRoleDetail({});
    setStatusRoleModal(false);
  };

  const columns = [
    {
      key: "details",
      width: 110,
      name: "Detalles",
      renderCell: ({ row }) => {
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton onClick={() => onClickDetailRole(row.name)}>
              <FAIcon customClass="icon" icon={faQuestion} />
            </CButton>
          </div>
        );
      },
    },
    {
      key: "name",
      name: "Nombre (Rol)",
      minWidth: 150,
      resizable: true,
      renderCell: ({ row }) => {
        if (row.name === "admin") return <>{"ADMINISTRADOR"}</>;
        if (row.name === "professor") return <>{"PROFESOR"}</>;
        if (row.name === "student") return <>{"ESTUDIANTE"}</>;
        if (row.name === "user") return <>{"USUARIO"}</>;
      },
    },
    {
      key: "status",
      name: "Estado",
      width: 120,
      resizable: true,
      renderCell: ({ row }) => {
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton
              style={{ cursor: "default" }}
              color={row.name !== "user" ? "success" : "danger"}
              className="text-white"
            >
              {row.name !== "user" ? "En uso" : "Sin usar"}
            </CButton>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <CRow className="mt-3 mb-2">
        <CCol>
          <div style={{ height: 450, width: "100%", overflow: "hidden" }}>
            <Loader show={!roles} center={true} />
            {roles ? (
              <DataGrid
                className="rdg-light"
                columns={columns}
                rows={roles || []}
                rowHeight={70}
                style={{ height: 450 }}
                resizable
              />
            ) : (
              <></>
            )}
          </div>
        </CCol>
      </CRow>
      <RoleDetail
        statusModal={statusRoleModal}
        hideModal={hideModal}
        roleDetail={roleDetail}
      />
    </>
  );
};
