import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DataGrid from "react-data-grid";
import { CAvatar, CCol, CRow } from "@coreui/react";
import { Button, Space } from "antd";
import { FAIcon } from "src/assets/icon/FAIcon";
import Loader from "src/components/layout/loader/Loader";
import imgUser from "src/assets/images/user.png";

import {
  getAllRoles,
  getAllProfessors,
  deleteProfessor,
  updateStatusProfessor,
} from "src/store";
import { intranetAvatarApi } from "src/api";

import {
  AddProfessor,
  ConfirmChangeStatus,
  ConfirmDeleteProfessor,
} from "../modals";

export const ProfessorsRecords = () => {
  const dispatch = useDispatch();
  const { professors, statusDataProfessor } = useSelector(
    (state) => state.professors
  );

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusStatusProfessorModal, setStatusStatusProfessorModal] =
    useState(false);
  const [statusAddProfessorModal, setStatusAddProfessorModal] = useState(false);
  const [statusDeleteProfessorModal, setStatusDeleteProfessorModal] =
    useState(false);
  const [dataProfessor, setDataProfessor] = useState({});

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllRoles());
    dispatch(getAllProfessors());
  }, []);

  // se cierra modal si se hizo crud
  useEffect(() => {
    if (statusDataProfessor !== null) {
      hideModal();
    }
  }, [statusDataProfessor]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (professors) {
      if (professors.length !== 0) {
        const data = [...professors]; // crea una copia de professors
        data.sort((a, b) => b.id - a.id);
        setRows(data);
      } else {
        setRows([]);
      }
    }
  }, [professors]);

  // captura eventos en los estados
  const handleChangeStatusProfessor = (row) => {
    if (!row.status) {
      changeStatusProfessor(row);
      return;
    } else {
      setDataProfessor(row);
      setStatusStatusProfessorModal(true);
      return;
    }
  };

  // captura eventos de eliminacion
  const handleRemoveProfessor = (row) => {
    setDataProfessor(row);
    setStatusDeleteProfessorModal(true);
  };

  // cambia estado del usuario
  const changeStatusProfessor = (row) => {
    if (row.status) {
      dispatch(updateStatusProfessor({ id: row.id, status: false }));
    } else {
      dispatch(updateStatusProfessor({ id: row.id, status: true }));
    }
  };

  // elimina usuario
  const removeProfessor = (row) => {
    dispatch(deleteProfessor({ id: row.id }));
  };

  // muestra modal de usuario
  const showAddProfessorModal = () => {
    setStatusAddProfessorModal(true);
  };

  const hideModal = () => {
    setDataProfessor({});
    setStatusAddProfessorModal(false);
    setStatusStatusProfessorModal(false);
    setStatusDeleteProfessorModal(false);
  };

  const columns = [
    {
      key: "actions",
      name: "Acciones",
      resizable: true,
      width: 110,
      renderCell: ({ row }) => {
        const onClickEdit = () => {
          setDataProfessor(row);
          showAddProfessorModal();
        };
        const onClickDelete = () => {
          handleRemoveProfessor(row);
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button title="Editar" className="p-0 px-2" onClick={onClickEdit}>
              <FAIcon customClass="icon" icon={faEdit} />
            </Button>
            <Button
              title="Eliminar"
              style={{ color: "red" }}
              className="p-0 px-2"
              onClick={onClickDelete}
            >
              <FAIcon customClass="icon" icon={faTrash} />
            </Button>
          </Space>
        );
      },
    },
    {
      key: "name",
      name: "Nombres",
      minWidth: 210,
      resizable: true,
      renderCell: ({ row }) => {
        return (
          <span title={`${row.name} ${row.lastName1} ${row.lastName2}`}>
            {" "}
            <CAvatar
              size="sm"
              src={
                !row.filename ? imgUser : `${intranetAvatarApi}/${row.filename}`
              }
              style={{ marginRight: 10, overflow: "hidden" }}
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
      minWidth: 80,
      resizable: true,
    },
    {
      key: "status",
      name: "Estado",
      width: 110,
      resizable: true,
      renderCell: ({ row }) => {
        const onClickStatus = () => {
          handleChangeStatusProfessor(row);
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button
              title="Cambiar estado"
              type="primary"
              className={row.status ? "bg-success" : "bg-danger"}
              onClick={onClickStatus}
            >
              {row.status ? "Activo" : "Inactivo"}
            </Button>
          </Space>
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
      <CRow className="mb-2">
        <CCol>
          <Button
            type="primary"
            style={{ background: "green" }}
            onClick={showAddProfessorModal}
          >
            Registrar
          </Button>
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
          <div style={{ height: 400, width: "100%", overflow: "hidden" }}>
            <Loader show={!professors} center={true} />
            {professors ? (
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
      <AddProfessor
        statusAddProfessorModal={statusAddProfessorModal}
        hideAddProfessorModal={hideModal}
        dataProfessor={dataProfessor}
      />
      <ConfirmChangeStatus
        statusStatusProfessorModal={statusStatusProfessorModal}
        hideStatusProfessorModal={hideModal}
        changeStatus={() => changeStatusProfessor(dataProfessor)}
        dataProfessor={dataProfessor}
      />
      <ConfirmDeleteProfessor
        statusDeleteProfessorModal={statusDeleteProfessorModal}
        hideDeleteProfessorModal={hideModal}
        removeProfessor={() => removeProfessor(dataProfessor)}
        dataProfessor={dataProfessor}
      />
    </>
  );
};
