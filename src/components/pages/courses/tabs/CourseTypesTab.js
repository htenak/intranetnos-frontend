import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseTypes } from "src/store";

import { CButton, CCol, CRow } from "@coreui/react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";

import {
  AddCourseTypeModal,
  DeleteCourseTypeModal,
  InfoCoursesModal,
} from "../modals";

export const CourseTypesTab = () => {
  const dispatch = useDispatch();
  const { courseTypes, statusDataCourseType } = useSelector(
    (state) => state.academic
  );
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusAddCourseTypeModal, setStatusAddCourseTypeModal] =
    useState(false);
  const [statusDeleteCourseTypeModal, setStatusDeleteCourseTypeModal] =
    useState(false);
  const [statusInfoCoursesModal, setStatusInfoCoursesModal] = useState(false);
  const [dataCourseType, setDataCourseType] = useState({});

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllCourseTypes());
  }, []);

  // se consultan datos si se hizo crud
  useEffect(() => {
    if (statusDataCourseType !== null) {
      dispatch(getAllCourseTypes());
      hideModal();
    }
  }, [statusDataCourseType]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (courseTypes) {
      if (courseTypes.length !== 0) {
        const data = [...courseTypes];
        setRows(data.sort((a, b) => b.id - a.id));
      }
    }
  }, [courseTypes]);

  // datos para la grid
  const columns = [
    {
      key: "actions",
      name: "Acciones",
      resizable: true,
      width: 110,
      renderCell: ({ row }) => {
        const onClickEdit = () => {
          setDataCourseType(row);
          showAddCourseTypeModal();
        };
        const onClickDelete = () => {
          setDataCourseType(row);
          setStatusDeleteCourseTypeModal(true);
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
      name: "Tipo de curso",
      minWidth: 150,
      resizable: true,
    },
    {
      key: "description",
      name: "Descripción",
      minWidth: 200,
      resizable: true,
    },
    {
      key: "courses",
      name: "Cursos",
      width: 130,
      resizable: true,
      renderCell: ({ row }) => {
        const onClick = () => {
          setDataCourseType(row);
          setStatusInfoCoursesModal(true);
        };
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton color="primary" className="text-white" onClick={onClick}>
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

  // muestra modal para agregar tipo de curso
  const showAddCourseTypeModal = () => {
    setStatusAddCourseTypeModal(true);
  };

  const hideModal = () => {
    setDataCourseType({});
    setStatusAddCourseTypeModal(false);
    setStatusDeleteCourseTypeModal(false);
    setStatusInfoCoursesModal(false);
  };

  return (
    <>
      <CRow className="mt-3 mb-2">
        <CCol>
          <CButton
            color="success"
            className="text-white"
            onClick={showAddCourseTypeModal}
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
            <Loader show={!courseTypes} center={true} />
            {courseTypes ? (
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
      <AddCourseTypeModal
        statusAddCourseTypeModal={statusAddCourseTypeModal}
        hideAddCourseTypeModal={hideModal}
        dataCourseType={dataCourseType}
      />
      <DeleteCourseTypeModal
        statusDeleteCourseTypeModal={statusDeleteCourseTypeModal}
        hideDeleteCourseTypeModal={hideModal}
        dataCourseType={dataCourseType}
      />
      <InfoCoursesModal
        statusInfoCoursesModal={statusInfoCoursesModal}
        hideInfoCoursesModal={hideModal}
        dataCourseType={dataCourseType}
      />
    </>
  );
};
