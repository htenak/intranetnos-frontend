import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses, updateCourse } from "src/store";

import { CButton, CCol, CRow } from "@coreui/react";
import {
  faBookReader,
  faEdit,
  faGraduationCap,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";

import { AddCourseModal, DeleteCourseModal } from "../modals";

export const CoursesTab = () => {
  const dispatch = useDispatch();
  const { courses, statusDataCourse } = useSelector((state) => state.academic);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusAddCourseModal, setStatusAddCourseModal] = useState(false);
  const [statusDeleteCourseModal, setStatusDeleteCourseModal] = useState(false);
  const [dataCourse, setDataCourse] = useState({});

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  // se consultan datos si se hizo crud
  useEffect(() => {
    if (statusDataCourse !== null) {
      dispatch(getAllCourses());
      hideModal();
    }
  }, [statusDataCourse]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (courses) {
      if (courses.length !== 0) {
        const data = [...courses];
        setRows(data.sort((a, b) => b.id - a.id));
      }
    }
  }, [courses]);

  // datos para la grid
  const columns = [
    {
      key: "actions",
      name: "Acciones",
      resizable: true,
      width: 110,
      renderCell: ({ row }) => {
        const onClickEdit = () => {
          setDataCourse(row);
          showAddCourseModal();
        };
        const onClickDelete = () => {
          setDataCourse(row);
          setStatusDeleteCourseModal(true);
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
      key: "abbreviation",
      name: "Abreviatura",
      width: 130,
      resizable: true,
    },
    {
      key: "name",
      name: "Curso",
      minWidth: 200,
      resizable: true,
    },
    {
      key: "courseType",
      name: "Tipo",
      width: 65,
      resizable: true,
      renderCell: ({ row }) => {
        const onClick = () => {};
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton
              color="warning"
              className="text-white"
              onClick={onClick}
              title="Ver"
            >
              <FAIcon customClass="icon" icon={faBookReader} />
            </CButton>
          </div>
        );
      },
    },
    {
      key: "career",
      name: "Carrera",
      width: 70,
      resizable: true,
      renderCell: ({ row }) => {
        const onClick = () => {};
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton
              color="primary"
              className="text-white"
              onClick={onClick}
              title="Ver"
            >
              <FAIcon customClass="icon" icon={faGraduationCap} />
            </CButton>
          </div>
        );
      },
    },
    {
      key: "status",
      name: "Estado",
      width: 110,
      resizable: true,
      renderCell: ({ row }) => {
        const onClickStatus = () => {
          dispatch(updateCourse({ id: row.id, status: !row.status }));
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

  // muestra modal para agregar tipo de curso
  const showAddCourseModal = () => {
    setStatusAddCourseModal(true);
  };

  const hideModal = () => {
    setDataCourse({});
    setStatusAddCourseModal(false);
    setStatusDeleteCourseModal(false);
  };

  return (
    <>
      <CRow className="mt-3 mb-2">
        <CCol>
          <CButton
            color="success"
            className="text-white"
            onClick={showAddCourseModal}
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
            <Loader show={!courses} center={true} />
            {courses ? (
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
      <AddCourseModal
        statusAddCourseModal={statusAddCourseModal}
        hideAddCourseModal={hideModal}
        dataCourse={dataCourse}
      />
      <DeleteCourseModal
        statusDeleteCourseModal={statusDeleteCourseModal}
        hideDeleteCourseModal={hideModal}
        dataCourse={dataCourse}
      />
    </>
  );
};
