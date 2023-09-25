import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DataGrid from "react-data-grid";
import { CButton, CCol, CRow } from "@coreui/react";
import { FAIcon } from "src/assets/icon/FAIcon";

import {
  deleteUser,
  getAllRoles,
  getAllUsers,
  updateStatusUser,
} from "src/store";
import Loader from "src/components/layout/loader/Loader";
import { AddUser, ConfirmChangeStatus, ConfirmDeleteUser } from "../modals";

export const UsersTab = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users, isLoadingUsers, statusDataUser } = useSelector(
    (state) => state.users
  );

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusStatusUserModal, setStatusStatusUserModal] = useState(false);
  const [statusAddUserModal, setStatusAddUserModal] = useState(false);
  const [statusDeleteUserModal, setStatusDeleteUserModal] = useState(false);
  const [dataUser, setDataUser] = useState({});

  // se consultan datos solo la primera vez
  useEffect(() => {
    if (isLoadingUsers === "no-changed") {
      dispatch(getAllUsers("*"));
      dispatch(getAllRoles());
    }
  }, [isLoadingUsers]);

  // se consultan datos si se hizo crud
  useEffect(() => {
    if (
      statusDataUser === "created" ||
      statusDataUser === "updated" ||
      statusDataUser === "deleted"
    ) {
      dispatch(getAllUsers("*"));
      hideModal();
    }
  }, [statusDataUser]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (isLoadingUsers === "loaded") {
      const data = users
        ?.filter((data) => data.id !== user.id)
        .sort((a, b) => b.id - a.id);
      setRows(data);
    }
  }, [isLoadingUsers]);

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
      hideModal();
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
      width: 108,
      renderCell: ({ row }) => {
        const onClickEdit = () => {
          setDataUser(row);
          showAddUserModal();
        };
        const onClickDelete = () => {
          handleRemoveUser(row);
        };
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton color="info" className="text-white" onClick={onClickEdit}>
              <FAIcon customClass="icon" icon={faEdit} />
            </CButton>
            <CButton
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
      minWidth: 200,
      resizable: true,
      renderCell: ({ row }) => {
        return <div>{`${row.name} ${row.lastName1} ${row.lastName2}`}</div>;
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
      key: "role",
      name: "Tipo",
      minWidth: 90,
      resizable: true,
      renderCell: ({ row }) => {
        return (
          <span>
            {row.role?.name === "admin" && "ADMINISTRADOR"}
            {row.role?.name === "professor" && "PROFESOR"}
            {row.role?.name === "student" && "ESTUDIANTE"}
            {row.role?.name === "user" && "USUARIO"}
          </span>
        );
      },
    },
    {
      key: "status",
      name: "Estado",
      width: 95,
      resizable: true,
      renderCell: ({ row }) => {
        const onClickStatus = () => {
          handleChangeStatusUser(row);
        };
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton
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
            onClick={showAddUserModal}
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
          {isLoadingUsers === "loading" && statusDataUser === "no-changed" && (
            <Loader />
          )}
          {rows ? (
            <DataGrid
              className="rdg-light"
              columns={columns}
              rows={filter(rows) || []}
              rowHeight={45}
              resizable
            />
          ) : (
            <></>
          )}
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
