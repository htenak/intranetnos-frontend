import {
  CAlert,
  CAvatar,
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { faTrash, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import DataGrid from "react-data-grid";
import { toast } from "react-toastify";
import { intranetAvatarApi } from "src/api";
import { FAIcon } from "src/assets/icon/FAIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudentClass,
  getAllStudents,
  getAllStudentsClassByClassId,
  saveStudentClass,
  updateStudentClass,
} from "src/store";
import Loader from "src/components/layout/loader/Loader";
import { friendlyDateFormat } from "src/components/helpers/";
import imgUser from "src/assets/images/user.png";
import { SelectSearch } from "../../../customComponents";

export const StudentsClassModal = ({
  statusStudentsClassModal,
  hideStudentsClassModal,
  dataClass,
}) => {
  const dispatch = useDispatch();
  const { studentsClassByClassId } = useSelector((state) => state.classes);
  const { students } = useSelector((state) => state.students);

  const initialStateValues = {
    id: 0,
    classId: 0,
    studentUserId: 0,
  };
  const [values, setValues] = useState(initialStateValues);
  const [rows, setRows] = useState([]);
  const [searchStudents, setSearchStudents] = useState([]);

  // consulto clases de estudiantes y asigno classId al abrir modal
  useEffect(() => {
    if (statusStudentsClassModal) {
      if (dataClass?.id !== 0) {
        dispatch(getAllStudentsClassByClassId(dataClass.id));
        setValues({ ...values, classId: dataClass.id });
      }
    }
  }, [statusStudentsClassModal]);

  // consulto todos los estudiantes
  useEffect(() => {
    if (statusStudentsClassModal) {
      dispatch(getAllStudents());
    }
  }, [statusStudentsClassModal]);

  // asigno registros a un estado local
  useEffect(() => {
    if (studentsClassByClassId) {
      if (studentsClassByClassId.length !== 0) {
        const studentsClass = [...studentsClassByClassId];
        setRows(studentsClass.sort((a, b) => b.id - a.id));
      } else {
        setRows([]);
      }
    }
  }, [studentsClassByClassId]);

  // asigno estudiantes para el campo
  useEffect(() => {
    if (students) {
      if (students.length !== 0) {
        setSearchStudents(
          students
            .map((student) => ({
              ...student,
              value: student.id,
              label: `${student.name} ${student.lastName1} ${student.lastName2}`,
            }))
            .filter((s) => s.status)
        );
      } else {
        setSearchStudents([]);
      }
    }
  }, [students]);

  // cambios en estudiante
  const handleChangeStudent = (element) => {
    setValues({
      ...values,
      studentUserId: element.id,
    });
  };

  // guarda registro
  const handleSubmit = (e) => {
    e.preventDefault();

    if (values?.classId === 0) {
      return toast.error("Clase no encontrada");
    }
    if (values?.studentUserId === 0) {
      return toast.error("El estudiante es obligatorio");
    }

    if (values?.id !== 0) {
      dispatch(updateStudentClass(values));
    } else {
      dispatch(saveStudentClass(values));
    }

    setValues(initialStateValues);
  };

  const columns = [
    {
      key: "actions",
      name: "Acciones",
      resizable: true,
      width: 85,
      renderCell: ({ row }) => {
        const onClickDelete = () => {
          const confirm = window.confirm("Por favor, confirma esta acción");
          if (confirm) {
            dispatch(deleteStudentClass(row));
          }
        };
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
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
      key: "student",
      name: "Alumnos",
      minWidth: 210,
      resizable: true,
      renderCell: ({ row }) => {
        // hacer que se vea el nombre del usuario al crear
        // ya que son datos que no retorna al crear
        return (
          <span
            title={`${row.student?.name} ${row.student?.lastName1} ${row.student?.lastName2}`}
          >
            {" "}
            <CAvatar
              size="sm"
              src={
                !row.student?.filename
                  ? imgUser
                  : `${intranetAvatarApi}/${row.student?.filename}`
              }
              style={{ marginRight: 10, overflow: "hidden" }}
            />
            {`${row.student?.name} ${row.student?.lastName1} ${row.student?.lastName2}`}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      name: "Fecha de inscripción",
      resizable: true,
      width: 180,
      renderCell: ({ row }) => {
        return <span>{friendlyDateFormat(row.createdAt)}</span>;
      },
    },
    {
      key: "status",
      name: "Estado",
      width: 120,
      resizable: true,
      renderCell: ({ row }) => {
        const onClickStatus = () => {
          dispatch(updateStudentClass({ id: row.id, status: !row.status }));
        };
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton
              title="Cambiar estado"
              color={row.status ? "success" : "danger"}
              className="text-white"
              onClick={onClickStatus}
            >
              {row.status ? "Cursando" : "Concluido"}
            </CButton>
          </div>
        );
      },
    },
  ];

  const hideModal = () => {
    setValues(initialStateValues);
    hideStudentsClassModal();
  };

  return (
    <CModal
      backdrop="static"
      alignment="center"
      visible={statusStudentsClassModal}
      onClose={hideModal}
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Alumnos en esta clase</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className="mb-3">
          <CCol xs={12}>
            <CAlert color="primary" visible={true} className="text-center">
              <span className="d-block">{dataClass?.career?.name}</span>
              {dataClass?.denomination || ""}
            </CAlert>
          </CCol>
          <CCol lg={10}>
            <SelectSearch
              value={
                (searchStudents &&
                  searchStudents.find(
                    (element) => element.value === values.studentUserId
                  )) ||
                ""
              }
              placeholder="Buscar y seleccionar estudiante"
              options={searchStudents}
              icon={faUserGraduate}
              noResultsMessage={"Estudiante no encontrado"}
              onChange={handleChangeStudent}
            />
          </CCol>
          <CCol
            lg={2}
            className="mt-2 mt-lg-0 align-self-end text-end text-lg-center"
          >
            <CButton
              disabled={!values?.studentUserId ? true : false}
              title="Registrar estudiante en esta clase"
              onClick={handleSubmit}
            >
              Registrar
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <div style={{ height: 300, width: "100%", overflow: "hidden" }}>
              <Loader show={!studentsClassByClassId} center={true} />
              {studentsClassByClassId ? (
                <DataGrid
                  className="rdg-light"
                  columns={columns}
                  rows={rows || []}
                  rowHeight={50}
                  style={{ height: 300 }}
                  resizable
                />
              ) : (
                <></>
              )}
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="dark" onClick={hideModal}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
