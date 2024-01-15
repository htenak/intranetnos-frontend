import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClasses,
  updateClass,
  setStudentsClassByClassId,
} from "src/store";

import { CCol, CRow } from "@coreui/react";
import { Button, Space } from "antd";
import {
  faEdit,
  faTrash,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";

import { AddClassModal, DeleteClassModal, StudentsClassModal } from "../modals";

export const ClassesRecords = () => {
  const dispatch = useDispatch();
  const { classes, statusDataClass } = useSelector((state) => state.classes);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusAddClassModal, setStatusAddClassModal] = useState(false);
  const [statusDeleteClassModal, setStatusDeleteClassModal] = useState(false);
  const [statusStudentsClassModal, setStatusStudentsClassModal] =
    useState(false);
  const [dataClass, setDataClass] = useState({});

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllClasses());
  }, []);

  // cierra modal si se hizo crud
  useEffect(() => {
    if (statusDataClass !== null) {
      hideModal();
    }
  }, [statusDataClass]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (classes) {
      if (classes.length !== 0) {
        const data = [...classes];
        setRows(data.sort((a, b) => b.id - a.id));
      }
    }
  }, [classes]);

  // datos para la grid
  const columns = [
    {
      key: "actions",
      name: "Acciones",
      resizable: true,
      width: 135,
      renderCell: ({ row }) => {
        const onClickEdit = () => {
          setDataClass(row);
          showAddClassModal();
        };
        const onClickStudentsClass = () => {
          dispatch(setStudentsClassByClassId(null));
          setDataClass(row);
          setStatusStudentsClassModal(true);
        };
        const onClickDelete = () => {
          setDataClass(row);
          setStatusDeleteClassModal(true);
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button
              type="link"
              className="p-0 mx-1"
              title="Editar"
              onClick={onClickEdit}
            >
              <FAIcon icon={faEdit} />
            </Button>
            <Button
              type="link"
              style={{ color: "green" }}
              className="p-0 mx-1"
              title="Alumnos de esta clase"
              onClick={onClickStudentsClass}
            >
              <FAIcon icon={faUserGraduate} />
            </Button>
            <Button
              type="link"
              style={{ color: "red" }}
              className="p-0 mx-1"
              title="Eliminar"
              onClick={onClickDelete}
            >
              <FAIcon icon={faTrash} />
            </Button>
          </Space>
        );
      },
    },
    {
      key: "denomination",
      name: "Clases",
      minWidth: 320,
      resizable: true,
      renderCell: ({ row }) => {
        return <span title={row.denomination}>{row.denomination}</span>;
      },
    },
    {
      key: "career",
      name: "Carrera",
      minWidth: 240,
      resizable: true,
      renderCell: ({ row }) => {
        return <span title={row.career?.name}>{row.career?.name}</span>;
      },
    },
    {
      key: "status",
      name: "Estado",
      width: 110,
      resizable: true,
      renderCell: ({ row }) => {
        const onClickStatus = () => {
          dispatch(updateClass({ id: row.id, status: !row.status }));
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button
              type="primary"
              title="Cambiar estado"
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

  // muestra modal para agregar tipo de curso
  const showAddClassModal = () => {
    setStatusAddClassModal(true);
  };

  const hideModal = () => {
    setDataClass({});
    setStatusAddClassModal(false);
    setStatusDeleteClassModal(false);
    setStatusStudentsClassModal(false);
  };

  return (
    <>
      <CRow className="mb-2">
        <CCol>
          <Button
            type="primary"
            style={{ background: "green" }}
            onClick={showAddClassModal}
          >
            Registrar
          </Button>
        </CCol>
        {/* POR HACER: agregar select para filtrar por ciclo (u otros) */}
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
            <Loader show={!classes} center={true} />
            {classes ? (
              <DataGrid
                className="rdg-light"
                columns={columns}
                rows={filter(rows) || []}
                rowHeight={50}
                style={{ height: 450 }}
                resizable
              />
            ) : (
              <></>
            )}
          </div>
        </CCol>
      </CRow>
      <AddClassModal
        statusAddClassModal={statusAddClassModal}
        hideAddClassModal={hideModal}
        dataClass={dataClass}
      />
      <StudentsClassModal
        statusStudentsClassModal={statusStudentsClassModal}
        hideStudentsClassModal={hideModal}
        dataClass={dataClass}
      />
      <DeleteClassModal
        statusDeleteClassModal={statusDeleteClassModal}
        hideDeleteClassModal={hideModal}
        dataClass={dataClass}
      />
    </>
  );
};
