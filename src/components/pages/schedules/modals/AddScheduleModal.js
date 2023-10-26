import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { toast } from "react-toastify";
import { getAllClasses, saveSchedule, updateSchedule } from "src/store";
import { SelectSearch } from "../../customComponents";
import { faBookOpen, faCalendar } from "@fortawesome/free-solid-svg-icons";

export const AddScheduleModal = ({
  statusAddScheduleModal,
  hideAddScheduleModal,
  dataSchedule,
}) => {
  const dispatch = useDispatch();
  const { classes, days } = useSelector((state) => state.classes);
  const initialStateValues = {
    id: 0,
    startTime: "",
    endTime: "",
    dayId: 0,
    classId: 0,
  };
  const [values, setValues] = useState(initialStateValues);
  const [searchClasses, setSearchClasses] = useState([]);
  const [searchDays, setSearchDays] = useState([]);
  // consulta datos
  useEffect(() => {
    if (statusAddScheduleModal) {
      dispatch(getAllClasses());
    }
  }, [statusAddScheduleModal]);

  // asigna values (editar)
  useEffect(() => {
    if (dataSchedule?.id) {
      setValues(dataSchedule);
    } else {
      setValues(initialStateValues);
    }
  }, [statusAddScheduleModal]);

  // asigno clases para el campo
  useEffect(() => {
    if (classes) {
      if (classes.length !== 0) {
        setSearchClasses(
          classes.map((classs) => ({
            ...classs,
            value: classs.id,
            label: classs.denomination,
          }))
        );
      } else {
        setSearchClasses([]);
      }
    }
  }, [classes]);

  // asigno carreras para el campo
  useEffect(() => {
    if (days) {
      if (days.length !== 0) {
        setSearchDays(
          days.map((day) => ({
            ...day,
            value: day.id,
            label: day.name,
          }))
        );
      } else {
        setSearchDays([]);
      }
    }
  }, [days]);

  // cambios en inputs html
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // cambios en clase
  const handleChangeClass = (element) => {
    setValues({
      ...values,
      classId: element.id,
    });
  };

  // cambios en día
  const handleChangeDay = (element) => {
    setValues({
      ...values,
      dayId: element.id,
    });
  };

  // envío de datos
  const handleSubmit = (e) => {
    e.preventDefault();

    if (values?.id !== 0) {
      dispatch(updateSchedule(values));
    } else {
      dispatch(saveSchedule(values));
    }
  };

  const hideModal = () => {
    setValues(initialStateValues);
    hideAddScheduleModal();
  };

  // console.log(values);

  return (
    <CModal
      alignment="center"
      visible={statusAddScheduleModal}
      onClose={hideModal}
      size="lg"
    >
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          {values?.id !== 0 ? (
            <CModalTitle>Editar horario</CModalTitle>
          ) : (
            <CModalTitle>Registrar horario</CModalTitle>
          )}
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={12} className="mt-2">
              <CFormLabel className="mb-1">
                Clase <span className="text-danger">*</span>
              </CFormLabel>
              <SelectSearch
                value={
                  (searchClasses &&
                    searchClasses.find(
                      (element) => element.value === values.classId
                    )) ||
                  ""
                }
                placeholder="Buscar clase"
                options={searchClasses}
                icon={faBookOpen}
                noResultsMessage={"Clase no encontrada"}
                onChange={handleChangeClass}
              />
            </CCol>
            <CCol xs={4} className="mt-2">
              <CFormLabel className="mb-1">Día</CFormLabel>
              <SelectSearch
                value={
                  (searchDays &&
                    searchDays.find(
                      (element) => element.value === values.dayId
                    )) ||
                  ""
                }
                placeholder="Elegir día"
                options={searchDays}
                icon={faCalendar}
                noResultsMessage={"Día no encontrado"}
                onChange={handleChangeDay}
              />
            </CCol>
            <CCol xs={4} className="mt-2">
              <CFormLabel className="mb-1">Hora de inicio</CFormLabel>
              <CFormInput
                type="time"
                name="startTime"
                onChange={handleInputChange}
                value={values?.startTime || ""}
              />
            </CCol>
            <CCol xs={4} className="mt-2">
              <CFormLabel className="mb-1">Hora de cierre</CFormLabel>
              <CFormInput
                type="time"
                name="endTime"
                onChange={handleInputChange}
                value={values?.endTime || ""}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={hideModal}>
            Cerrar
          </CButton>
          <CButton color="success" className="text-white" type="submit">
            {values?.id !== 0 ? "Actualizar" : "Guardar"}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
};
