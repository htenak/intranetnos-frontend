import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCareers } from "src/store";

import { CButton, CCol, CRow } from "@coreui/react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";

import {
  AddCareerModal,
  CoursesCareerModal,
  DeleteCareerModal,
} from "../modals";

export const CareersTab = () => {
  const dispatch = useDispatch();
  const { careers, statusDataCareer } = useSelector((state) => state.academic);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusAddCareerModal, setStatusAddCareerModal] = useState(false);
  const [statusDeleteCareerModal, setStatusDeleteCareerModal] = useState(false);
  const [statusCoursesCareerModal, setStatusCoursesCareerModal] =
    useState(false);
  const [dataCareer, setDataCareer] = useState({});

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllCareers());
  }, []);

  // se consultan datos si se hizo crud
  useEffect(() => {
    if (statusDataCareer !== null) {
      dispatch(getAllCareers());
      hideModal();
    }
  }, [statusDataCareer]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (careers) {
      if (careers.length !== 0) {
        const data = [...careers];
        setRows(data.sort((a, b) => b.id - a.id));
      }
    }
  }, [careers]);

  // datos para la grid
  const columns = [
    {
      key: "actions",
      name: "Acciones",
      resizable: true,
      width: 110,
      renderCell: ({ row }) => {
        const onClickEdit = () => {
          setDataCareer(row);
          showAddCareerModal();
        };
        const onClickDelete = () => {
          setDataCareer(row);
          setStatusDeleteCareerModal(true);
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
      name: "Carrera",
      minWidth: 180,
      resizable: true,
    },
    {
      key: "description",
      name: "Descripción",
      minWidth: 90,
      resizable: true,
    },
    {
      key: "courses",
      name: "Cursos",
      width: 130,
      resizable: true,
      renderCell: ({ row }) => {
        const onClick = () => {
          setDataCareer(row);
          setStatusCoursesCareerModal(true);
        };
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton
              title="Cambiar estado"
              color="primary"
              className="text-white"
              onClick={onClick}
            >
              Ver cursos
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

  // muestra modal de agregar carrera
  const showAddCareerModal = () => {
    setStatusAddCareerModal(true);
  };

  const hideModal = () => {
    setDataCareer({});
    setStatusAddCareerModal(false);
    setStatusDeleteCareerModal(false);
    setStatusCoursesCareerModal(false);
  };

  return (
    <>
      <CRow className="mt-3 mb-2">
        <CCol>
          <CButton
            color="success"
            className="text-white"
            onClick={showAddCareerModal}
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
