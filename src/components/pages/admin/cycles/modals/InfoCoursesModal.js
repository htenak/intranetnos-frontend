import { useEffect, useState } from "react";
import {
  CAlert,
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesByCycle } from "src/store";
import DataGrid from "react-data-grid";

export const InfoCoursesModal = ({
  statusInfoCoursesModal,
  hideInfoCoursesModal,
  dataCycle,
}) => {
  const dispatch = useDispatch();
  const { coursesByCycle } = useSelector((state) => state.academic);
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState(false);

  // consulta cursos por ciclo
  useEffect(() => {
    if (statusInfoCoursesModal) {
      if (dataCycle?.id) {
        dispatch(getCoursesByCycle(parseInt(dataCycle.id)));
      }
    }
  }, [statusInfoCoursesModal]);

  // asigna datos a un estado local
  useEffect(() => {
    if (coursesByCycle) {
      if (coursesByCycle.length !== 0) {
        setMessage(false);
        const courses = [...coursesByCycle];
        setRows(courses);
      } else {
        setRows([]);
        setMessage(true);
      }
    }
  }, [coursesByCycle]);

  // datos para la grid
  const columns = [
    {
      key: "abbreviation",
      name: "Abreviatura",
      width: 160,
      resizable: true,
    },
    {
      key: "name",
      name: "Cursos",
      minWidth: 220,
      resizable: true,
    },
    {
      key: "status",
      name: "Estado",
      width: 90,
      resizable: true,
      renderCell: ({ row }) => {
        return (
          <div className="text-center">
            <span
              title="Estado del curso"
              className={`text-white px-2 py-1 ${
                row.status ? "bg-success" : "bg-danger"
              }`}
            >
              {row.status ? "Activo" : "Inactivo"}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <CModal
      alignment="center"
      visible={statusInfoCoursesModal}
      onClose={hideInfoCoursesModal}
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>
          Todos los cursos en este ciclo: {dataCycle?.abbreviation}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert visible={message} color="danger" className="text-center">
          Aún no hay cursos dictandose en este ciclo
        </CAlert>
        {rows?.length !== 0 ? (
          <CRow>
            <CCol className="mb-2 text-center">
              <span>
                <b>En total</b>: {rows.length} cursos
              </span>
            </CCol>
            <CCol xs={12}>
              <div style={{ height: 300, width: "100%", overflow: "hidden" }}>
                {coursesByCycle ? (
                  <DataGrid
                    className="rdg-light"
                    columns={columns}
                    rows={rows || []}
                    rowHeight={40}
                    style={{ height: 300 }}
                    resizable
                  />
                ) : (
                  <></>
                )}
              </div>
            </CCol>
          </CRow>
        ) : (
          <></>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="dark" onClick={hideInfoCoursesModal}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
