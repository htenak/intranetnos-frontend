import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCareers,
  getAllClassrooms,
  getAllClassroomsCareers,
} from "src/store";

import { CCol, CRow } from "@coreui/react";
import { Button, Space } from "antd";
import { faEdit, faSitemap, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";

import {
  AddCareerModal,
  ClassroomsCareerModal,
  CoursesCareerModal,
  DeleteCareerModal,
} from "../modals";

export const CareersTab = () => {
  const dispatch = useDispatch();
  const { careers, statusDataCareer } = useSelector((state) => state.academic);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusAddCareerModal, setStatusAddCareerModal] = useState(false);
  const [statusCCModal, setStatusCCModal] = useState(false);
  const [statusDeleteCareerModal, setStatusDeleteCareerModal] = useState(false);
  const [statusCoursesCareerModal, setStatusCoursesCareerModal] =
    useState(false);
  const [dataCareer, setDataCareer] = useState({});

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllCareers());
    dispatch(getAllClassrooms());
    dispatch(getAllClassroomsCareers());
  }, []);

  // se cierra modal si hay crud
  useEffect(() => {
    if (statusDataCareer !== null) {
      hideModal();
    }
  }, [statusDataCareer]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (careers) {
      if (careers.length !== 0) {
        const data = [...careers];
        setRows(data.sort((a, b) => b.id - a.id));
      } else {
        setRows([]);
      }
    }
  }, [careers]);

  // datos para la grid
  const columns = [
    {
      key: "actions",
      name: "Acciones",
      resizable: true,
      width: 135,
      renderCell: ({ row }) => {
        const onClickEdit = () => {
          setDataCareer(row);
          showAddCareerModal();
        };
        const onClickClassrooms = () => {
          setDataCareer(row);
          showCCModal();
        };
        const onClickDelete = () => {
          setDataCareer(row);
          setStatusDeleteCareerModal(true);
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button
              title="Editar"
              type="default"
              className="p-0 px-2"
              onClick={onClickEdit}
            >
              <FAIcon icon={faEdit} />
            </Button>
            <Button
              title="Aulas"
              className="p-0 px-2"
              style={{ color: "green" }}
              onClick={onClickClassrooms}
            >
              <FAIcon icon={faSitemap} />
            </Button>
            <Button
              title="Eliminar"
              style={{ color: "red" }}
              className="p-0 px-2"
              onClick={onClickDelete}
            >
              <FAIcon icon={faTrash} />
            </Button>
          </Space>
        );
      },
    },
    {
      key: "name",
      name: "Carreras",
      minWidth: 150,
      resizable: true,
    },
    {
      key: "description",
      name: "Descripción",
      minWidth: 90,
      resizable: true,
    },
    {
      key: "classroomsCareer",
      name: "Aulas",
      width: 70,
      resizable: true,
      renderCell: ({ row }) => {
        return (
          <div
            className="text-center"
            title={`${row.classroomsCareer?.length} aulas`}
          >
            <span>{row.classroomsCareer?.length}</span>
          </div>
        );
      },
    },
    {
      key: "courses",
      name: "Cursos",
      width: 110,
      resizable: true,
      renderCell: ({ row }) => {
        const onClick = () => {
          setDataCareer(row);
          setStatusCoursesCareerModal(true);
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button
              title="Todos los cursos en esta carrera"
              className="text-primary"
              onClick={onClick}
            >
              Cursos
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

  // muestra modal de agregar carrera
  const showAddCareerModal = () => {
    setStatusAddCareerModal(true);
  };

  // muestra modal de aulas de carrera
  const showCCModal = () => {
    setStatusCCModal(true);
  };

  const hideModal = () => {
    setDataCareer({});
    setStatusCCModal(false);
    setStatusAddCareerModal(false);
    setStatusDeleteCareerModal(false);
    setStatusCoursesCareerModal(false);
  };

  return (
    <>
      <CRow className="mt-3 mb-2">
        <CCol className="align-self-center">
          <Button
            type="primary"
            style={{ background: "green" }}
            onClick={showAddCareerModal}
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
          <div
            style={{
              height: 450,
              width: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Loader show={!careers} center={true} />
            {careers ? (
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
      <AddCareerModal
        statusAddCareerModal={statusAddCareerModal}
        hideAddCareerModal={hideModal}
        dataCareer={dataCareer}
      />
      <ClassroomsCareerModal
        statusCCModal={statusCCModal}
        hideCCModal={hideModal}
        dataCareer={dataCareer}
      />
      <DeleteCareerModal
        statusDeleteCareerModal={statusDeleteCareerModal}
        hideDeleteCareerModal={hideModal}
        dataCareer={dataCareer}
      />
      <CoursesCareerModal
        statusCoursesCareerModal={statusCoursesCareerModal}
        hideCoursesCareerModal={hideModal}
        dataCareer={dataCareer}
      />
    </>
  );
};
