import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DataGrid from "react-data-grid";
import { CAvatar, CButton, CCol, CFormSelect, CRow } from "@coreui/react";
import { FAIcon } from "src/assets/icon/FAIcon";
import imgUser from "src/assets/images/user.png";

import {
  deleteUser,
  getAllRoles,
  getAllUsers,
  updateStatusUser,
} from "src/store";
import { intranetAvatarApi } from "src/api";

import Loader from "src/components/layout/loader/Loader";
import { AddUser, ConfirmChangeStatus, ConfirmDeleteUser } from "../modals";
import { Button, Space } from "antd";
import { getRoleName } from "src/components/helpers";

export const UsersTab = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users, statusDataUser } = useSelector((state) => state.users);

  const [query, setQuery] = useState("*");
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusStatusUserModal, setStatusStatusUserModal] = useState(false);
  const [statusAddUserModal, setStatusAddUserModal] = useState(false);
  const [statusDeleteUserModal, setStatusDeleteUserModal] = useState(false);
  const [dataUser, setDataUser] = useState({});

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllUsers(query));
    dispatch(getAllRoles());
  }, []);

  // se consultan datos si se cambio el query
  useEffect(() => {
    if (query) {
      dispatch(getAllUsers(query));
    }
  }, [query]);

  // se consultan datos si se hizo crud
  useEffect(() => {
    if (statusDataUser !== null) {
      hideModal();
    }
  }, [statusDataUser]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (users) {
      if (users.length !== 0) {
        const data = users
          ?.filter((data) => data.id !== user.id)
          .sort((a, b) => b.id - a.id);
        setRows(data);
      } else {
        setRows([]);
      }
    }
  }, [users]);

  // cambia query
  const handleChangeQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  // captura eventos en los estados
  const handleChangeStatusUser = (row) => {
    if (!row.status) {
      changeStatusUser(row);
      return;
    } else {
      setDataUser(row);
      setStatusStatusUserModal(true);
      return;
    }
  };

  // captura eventos de eliminacion
  const handleRemoveUser = (row) => {
    setDataUser(row);
    setStatusDeleteUserModal(true);
  };

  // cambia estado del usuario
  const changeStatusUser = (row) => {
    if (row.status) {
      dispatch(updateStatusUser({ id: row.id, status: false }));
    } else {
      dispatch(updateStatusUser({ id: row.id, status: true }));
    }
  };

  // elimina usuario
  const removeUser = (row) => {
    dispatch(deleteUser({ id: row.id }));
  };

  // muestra modal de usuario
  const showAddUserModal = () => {
    setStatusAddUserModal(true);
  };

  const hideModal = () => {
    setDataUser({});
    setStatusAddUserModal(false);
    setStatusStatusUserModal(false);
    setStatusDeleteUserModal(false);
  };

  const columns = [
    {
      key: "actions",
      name: "Acciones",
      resizable: true,
      width: 110,
      renderCell: ({ row }) => {
        const onClickEdit = () => {
          setDataUser(row);
          showAddUserModal();
        };
        const onClickDelete = () => {
          handleRemoveUser(row);
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button
              title="Editar"
              type="link"
              className="p-0 mx-1"
              onClick={onClickEdit}
            >
              <FAIcon customClass="icon" icon={faEdit} />
            </Button>
            <Button
              title="Eliminar"
              type="link"
              className="p-0 mx-1"
              style={{ color: "red" }}
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
      key: "role",
      name: "Tipo",
      minWidth: 90,
      resizable: true,
      renderCell: ({ row }) => {
        return <span>{getRoleName(row.role.name)}</span>;
      },
    },
    {
      key: "status",
      name: "Estado",
      width: 110,
      resizable: true,
      renderCell: ({ row }) => {
        const onClickStatus = () => {
          handleChangeStatusUser(row);
        };
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <Button
              title="Cambiar estado"
              type="primary"
              className={row.status ? "bg-success" : "bg-danger"}
              onClick={onClickStatus}
            >
              {row.status ? "Activo" : "Inactivo"}
            </Button>
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
          <Button
            type="primary"
            style={{ background: "green" }}
            onClick={showAddUserModal}
          >
            Registrar
          </Button>
        </CCol>
        <CCol xs={7} lg={3}>
          <CFormSelect
            onChange={handleChangeQuery}
            style={{ fontSize: "99.5%" }}
          >
            <option value="*">Todos los usuarios</option>
            <option value="true">Usuarios activos</option>
            <option value="false">Usuarios inactivos</option>
          </CFormSelect>
        </CCol>
        <CCol sm={12} lg={6} className="mt-2 mt-lg-0">
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
            <Loader show={!users} center={true} />
            {users ? (
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
      <AddUser
        statusAddUserModal={statusAddUserModal}
        hideAddUserModal={hideModal}
        dataUser={dataUser}
      />
      <ConfirmChangeStatus
        statusStatusUserModal={statusStatusUserModal}
        hideStatusUserModal={hideModal}
        changeStatus={() => changeStatusUser(dataUser)}
        dataUser={dataUser}
      />
      <ConfirmDeleteUser
        statusDeleteUserModal={statusDeleteUserModal}
        hideDeleteUserModal={hideModal}
        removeUser={() => removeUser(dataUser)}
        dataUser={dataUser}
      />
    </>
  );
};
