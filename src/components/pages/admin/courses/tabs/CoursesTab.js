import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses, updateStatusCourse } from "src/store";

import { CCol, CRow } from "@coreui/react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";

import { AddCourseModal, DeleteCourseModal } from "../modals";
import { Button, Space } from "antd";

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

  // cierra modal si se hizo crud
  useEffect(() => {
    if (statusDataCourse !== null) {
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
          <Space className="d-flex justify-content-center">
            <Button
              type="default"
              title="Editar"
              className="p-0 px-2"
              onClick={onClickEdit}
            >
              <FAIcon customClass="icon" icon={faEdit} />
            </Button>
            <Button
              type="default"
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
      key: "abbreviation",
      name: "Abreviatura",
      width: 130,
      resizable: true,
    },
    {
      key: "name",
      name: "Cursos",
      minWidth: 200,
      resizable: true,
    },
    {
      key: "courseType",
      name: "Tipo",
      width: 120,
      resizable: true,
      renderCell: ({ row }) => {
        return <>{row.courseType?.name}</>;
      },
    },
    {
      key: "status",
      name: "Estado",
      width: 110,
      resizable: true,
      renderCell: ({ row }) => {
        const onClickStatus = () => {
          dispatch(updateStatusCourse({ id: row.id, status: !row.status }));
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
          <Button
            type="primary"
            style={{ background: "green" }}
            onClick={showAddCourseModal}
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
