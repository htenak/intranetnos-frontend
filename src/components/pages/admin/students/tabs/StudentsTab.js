import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DataGrid from "react-data-grid";
import { CAvatar, CButton, CCol, CRow } from "@coreui/react";
import { FAIcon } from "src/assets/icon/FAIcon";

import {
  getAllRoles,
  getAllStudents,
  deleteStudent,
  updateStatusStudent,
} from "src/store";
import imgUser from "src/assets/images/user.png";
import Loader from "src/components/layout/loader/Loader";

import {
  AddStudent,
  ConfirmChangeStatus,
  ConfirmDeleteStudent,
} from "../modals";
import { intranetAvatarApi } from "src/api";

export const StudentsTab = () => {
  const dispatch = useDispatch();
  const { students, statusDataStudent } = useSelector(
    (state) => state.students
  );

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusStatusStudentModal, setStatusStatusStudentModal] =
    useState(false);
  const [statusAddStudentModal, setStatusAddStudentModal] = useState(false);
  const [statusDeleteStudentModal, setStatusDeleteStudentModal] =
    useState(false);
  const [dataStudent, setDataStudent] = useState({});

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllRoles());
    dispatch(getAllStudents());
  }, []);

  // se cierra modal si se hizo crud
  useEffect(() => {
    if (statusDataStudent !== null) {
      hideModal();
    }
  }, [statusDataStudent]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (students) {
      if (students.length !== 0) {
        const data = [...students]; // crea una copia de students
        data.sort((a, b) => b.id - a.id);
        setRows(data);
      } else {
        setRows([]);
      }
    }
  }, [students]);

  // captura eventos en los estados
  const handleChangeStatusStudent = (row) => {
    if (!row.status) {
      changeStatusStudent(row);
      return;
    } else {
      setDataStudent(row);
      setStatusStatusStudentModal(true);
      return;
    }
  };

  // captura eventos de eliminacion
  const handleRemoveStudent = (row) => {
    setDataStudent(row);
    setStatusDeleteStudentModal(true);
  };

  // cambia estado del usuario
  const changeStatusStudent = (row) => {
    if (row.status) {
      dispatch(updateStatusStudent({ id: row.id, status: false }));
    } else {
      dispatch(updateStatusStudent({ id: row.id, status: true }));
    }
  };

  // elimina usuario
  const removeStudent = (row) => {
    dispatch(deleteStudent({ id: row.id }));
  };

  // muestra modal de usuario
  const showAddStudentModal = () => {
    setStatusAddStudentModal(true);
  };

  const hideModal = () => {
    setDataStudent({});
    setStatusAddStudentModal(false);
    setStatusStatusStudentModal(false);
    setStatusDeleteStudentModal(false);
  };

  const columns = [
    {
      key: "actions",
      name: "Acciones",
      resizable: true,
      width: 110,
      renderCell: ({ row }) => {
        const onClickEdit = () => {
          setDataStudent(row);
          showAddStudentModal();
        };
        const onClickDelete = () => {
          handleRemoveStudent(row);
        };
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton
              title="Editar"
              color="info"
              className="text-white"
              onClick={onClickEdit}
            >
              <FAIcon customClass="icon" icon={faEdit} />
            </CButton>
            <CButton
              title="Eliminar"
              color="danger"
              className="text-white"
              onClick={onClickDelete}
            >
              <FAIcon customClass="icon" icon={faTrash} />
            </CButton>
          </div>
        );
      },
    },
    {
      key: "name",
      name: "Nombres",
      minWidth: 210,
      resizable: true,
      renderCell: ({ row }) => {
        const goImageURL = () => {
          if (row.filename) {
            window.open(`${intranetAvatarApi}/${row.filename}`, "_blank");
          }
        };
        return (
          <span title={`${row.name} ${row.lastName1} ${row.lastName2}`}>
            {" "}
            <CAvatar
              size="sm"
              src={
                !row.filename ? imgUser : `${intranetAvatarApi}/${row.filename}`
              }
              style={{ marginRight: 10, overflow: "hidden", cursor: "pointer" }}
              onClick={goImageURL}
            />
            {`${row.name} ${row.lastName1} ${row.lastName2}`}
          </span>
        );
      },
    },
    { key: "dni", name: "DNI", minWidth: 90, resizable: true },
    { key: "email", name: "Correo", minWidth: 120, resizable: true },
    {
      key: "phone",
      name: "Celular",
      minWidth: 90,
      resizable: true,
    },
    {
      key: "status",
      name: "Estado",
      width: 95,
      resizable: true,
      renderCell: ({ row }) => {
        const onClickStatus = () => {
          handleChangeStatusStudent(row);
        };
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton
              title="Cambiar estado"
              color={row.status ? "success" : "danger"}
              className="text-white"
              onClick={onClickStatus}
            >
              {row.status ? "Activo" : "Inactivo"}
            </CButton>
          </div>
        );
      },
    },
  ];

  // buscador
  const filter = (rows) => {
    return (
      rows.filter((row) =>
        Object.values(row).some((value) =>
          value?.toString().toLowerCase().includes(search.toLowerCase())
        )
      ) || rows
    );
  };

  return (
    <>
      <CRow className="mt-3 mb-2">
        <CCol>
          <CButton
            color="success"
            className="text-white"
            onClick={showAddStudentModal}
          >
            Registrar
          </CButton>
        </CCol>
        <CCol sm={9} lg={6} className="mt-2 mt-sm-0">
          <input
            type="search"
            className="form-control"
            placeholder="Ingrese criterio de busqueda"
            onChange={(e) => setSearch(e.target.value)}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <div style={{ height: 450, width: "100%", overflow: "hidden" }}>
            <Loader show={!students} center={true} />
            {students ? (
              <DataGrid
                className="rdg-light"
                columns={columns}
                rows={filter(rows) || []}
                rowHeight={45}
                style={{ height: 450 }}
                resizable
              />
            ) : (
              <></>
            )}
          </div>
        </CCol>
      </CRow>
      <AddStudent
        statusAddStudentModal={statusAddStudentModal}
        hideAddStudentModal={hideModal}
        dataStudent={dataStudent}
      />
      <ConfirmChangeStatus
        statusStatusStudentModal={statusStatusStudentModal}
        hideStatusStudentModal={hideModal}
        changeStatus={() => changeStatusStudent(dataStudent)}
        dataStudent={dataStudent}
      />
      <ConfirmDeleteStudent
        statusDeleteStudentModal={statusDeleteStudentModal}
        hideDeleteStudentModal={hideModal}
        removeStudent={() => removeStudent(dataStudent)}
        dataStudent={dataStudent}
      />
    </>
  );
};
