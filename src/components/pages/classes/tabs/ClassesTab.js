import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClasses,
  updateClass,
  setStudentsClassByClassId,
} from "src/store";

import { CButton, CCol, CRow } from "@coreui/react";
import {
  faEdit,
  faTrash,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";

import { AddClassModal, DeleteClassModal, StudentsClassModal } from "../modals";

export const ClassesTab = () => {
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

  // se consultan datos si se hizo crud
  useEffect(() => {
    if (statusDataClass !== null) {
      dispatch(getAllClasses());
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
      width: 165,
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
              title="Alumnos de esta clase"
              color="success"
              className="text-white"
              onClick={onClickStudentsClass}
            >
              <FAIcon customClass="icon" icon={faUserGraduate} />
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
      <CRow className="mt-3 mb-2">
        <CCol>
          <CButton
            color="success"
            className="text-white"
            onClick={showAddClassModal}
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
