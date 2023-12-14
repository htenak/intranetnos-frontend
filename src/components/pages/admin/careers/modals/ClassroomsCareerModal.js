import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FAIcon } from "src/assets/icon/FAIcon";
import {
  deleteClassroomCareer,
  getAllClassroomsCareerByCareerId,
  saveClassroomCareer,
  setClassroomsCareerByCareerId,
  updateClassroomCareer,
} from "src/store";

export const ClassroomsCareerModal = ({
  statusCCModal,
  hideCCModal,
  dataCareer,
}) => {
  const dispatch = useDispatch();
  const { classrooms, classroomsCareerByCareerId } = useSelector(
    (state) => state.academic
  );

  const initialStateValues = {
    id: 0,
    careerId: 0,
    classroomId: 0,
  };
  const [values, setValues] = useState(initialStateValues);
  const [classroomss, setClasroomss] = useState([]);
  const [rows, setRows] = useState([]);

  // consulto aulas de esta carrera y asigno careerId al abrir modal
  useEffect(() => {
    if (statusCCModal) {
      if (dataCareer?.id !== 0) {
        dispatch(getAllClassroomsCareerByCareerId(dataCareer.id));
        setValues({ ...values, careerId: dataCareer.id });
      }
    }
  }, [statusCCModal]);

  // asigno aulas
  useEffect(() => {
    if (classrooms && classrooms.length !== 0) {
      const data = [...classrooms];
      setClasroomss(data);
    } else {
      setClasroomss([]);
    }
  }, [classrooms]);

  // asigno aulas de la carrera
  useEffect(() => {
    if (classroomsCareerByCareerId && classroomsCareerByCareerId.length !== 0) {
      const data = [...classroomsCareerByCareerId];
      setRows(
        data.sort(
          (a, b) =>
            parseInt(a.classroom?.number) - parseInt(b.classroom?.number)
        )
      );
    } else {
      setRows([]);
    }
  }, [classroomsCareerByCareerId]);

  const alreadyAdded = (classroomId) => {
    if (rows && rows.length !== 0) {
      return rows.some(
        (cc) => parseInt(cc.classroomId) === parseInt(classroomId)
      );
    }
    return;
  };

  // guarda aula de carrera
  const handleSaveCC = (classroomId) => {
    if (parseInt(values?.careerId) === 0) {
      return toast.error("Carrera inválida");
    }
    if (parseInt(classroomId) === 0) {
      return toast.error("Aula inválida");
    }

    const form = {
      ...values,
      classroomId: parseInt(classroomId),
    };

    dispatch(saveClassroomCareer(form));
  };

  const handleUpdateStatusCC = (cc) => {
    dispatch(updateClassroomCareer({ id: cc.id, status: !cc.status }));
  };

  const handleRemoveCC = (cc) => {
    const confirm = window.confirm(
      "Por favor, confirma esta acción: (eliminar)"
    );
    if (confirm) {
      dispatch(deleteClassroomCareer(cc));
      return;
    }
  };

  const hideModal = () => {
    setValues(initialStateValues);
    dispatch(setClassroomsCareerByCareerId(null));
    hideCCModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusCCModal}
      onClose={hideModal}
      size="lg"
      backdrop="static"
    >
      <CModalHeader>
        <CModalTitle>Aulas en esta carrera</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol lg={12}>
            <CAlert color="primary" visible={true} className="text-center">
              <span>{dataCareer?.name}</span>
            </CAlert>
          </CCol>
        </CRow>
        <CRow>
          <CCol lg={5}>
            <CCard>
              <CCardHeader>Añadir aulas {"(click para añadir)"}</CCardHeader>
              <CCardBody>
                {classroomss && classroomss.length !== 0 && (
                  <>
                    {classroomss.map((c) => (
                      <div className="my-2" key={c.id}>
                        <Button
                          type="primary"
                          className="w-100"
                          onClick={() => handleSaveCC(c.id)}
                          disabled={alreadyAdded(c.id)}
                        >
                          {`N° ${c.number} - ${c.description}`}
                        </Button>
                      </div>
                    ))}
                  </>
                )}
              </CCardBody>
            </CCard>
          </CCol>
          <CCol lg={7} className="mt-2 mt-lg-0">
            {classroomsCareerByCareerId ? (
              <CCard>
                <CCardHeader>
                  Aulas registradas {"(click para eliminar)"}
                </CCardHeader>
                <CCardBody>
                  {rows && rows.length !== 0 ? (
                    <>
                      {rows.map((cc) => (
                        <div
                          className="my-2 d-flex justify-content-between"
                          key={cc.id}
                        >
                          <Button
                            type="primary"
                            className={`${
                              cc.status ? "bg-success" : "bg-danger"
                            }`}
                            style={{ width: "87%" }}
                            onClick={() => handleRemoveCC(cc)}
                          >
                            {`N° ${cc.classroom?.number} - ${cc.classroom?.description}`}
                          </Button>
                          <Button
                            type="primary"
                            className={`${
                              cc.status ? "bg-success" : "bg-danger"
                            }`}
                            onClick={() => handleUpdateStatusCC(cc)}
                          >
                            {cc.status ? (
                              <FAIcon icon={faToggleOn} />
                            ) : (
                              <FAIcon icon={faToggleOff} />
                            )}
                          </Button>
                        </div>
                      ))}
                    </>
                  ) : (
                    <CAlert color="danger" className="mt-2">
                      Esta carrera aún no tiene aulas
                    </CAlert>
                  )}
                </CCardBody>
              </CCard>
            ) : (
              <span>Cargando...</span>
            )}
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
