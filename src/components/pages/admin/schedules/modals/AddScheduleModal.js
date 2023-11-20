import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CAlert,
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { toast } from "react-toastify";
import { getAllClasses, saveSchedule, updateSchedule } from "src/store";
import { ObligatoryField, SelectSearch } from "../../../customComponents";
import { faBookOpen, faCalendar } from "@fortawesome/free-solid-svg-icons";

export const AddScheduleModal = ({
  statusAddScheduleModal,
  hideAddScheduleModal,
  careerIdTab,
  cycleIdSchedule,
  careerNameTab,
  dataSchedule,
}) => {
  const dispatch = useDispatch();
  const { cycles } = useSelector((state) => state.academic);
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
  const [cycleId, setCycleId] = useState(0);
  // consulta datos
  useEffect(() => {
    if (statusAddScheduleModal) {
      dispatch(getAllClasses());
      setCycleId(cycleIdSchedule);
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
  // verificar porque no sale la clase
  useEffect(() => {
    if (careerIdTab && classes && classes.length !== 0) {
      let filteredData = [...classes];
      filteredData = filteredData
        .map((classs) => ({
          ...classs,
          value: classs.id,
          label: `${classs.denomination}`,
        }))
        .filter(
          (c) => parseInt(c.career?.id) === parseInt(careerIdTab) && c.status
        );
      if (cycleId && cycleId !== 0) {
        // filtra también por el ciclo seleccionado
        filteredData = filteredData.filter(
          (c) => parseInt(c.cycleId) === parseInt(cycleId)
        );
      }
      setSearchClasses(filteredData);
    } else {
      // Si no se cumplen las condiciones, establece un array vacío
      setSearchClasses([]);
    }
  }, [classes, careerIdTab, cycleId]);

  // asigno días para el campo
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
    if (name === "cycleId") {
      setCycleId(parseInt(value));
      setValues({ ...values, classId: value === cycleId ? values.classId : 0 });
      return;
    }
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

    if (values?.classId === 0) {
      return toast.error("Clase no seleccionada");
    }
    if (values?.dayId === 0) {
      return toast.error("Día no seleccionado");
    }
    if (values?.startTime === "") {
      return toast.error("Hora de inicio no seleccionada");
    }
    if (values?.endTime === "") {
      return toast.error("Hora de fin no seleccionada");
    }

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

  return (
    <CModal
      alignment="center"
      visible={statusAddScheduleModal}
      onClose={hideModal}
      size="lg"
      backdrop="static"
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
            <CCol xs={12}>
              {careerNameTab ? (
                <CAlert color="success" visible={true} className="text-center">
                  {careerNameTab}
                </CAlert>
              ) : (
                <></>
              )}
            </CCol>
            <CCol xs={12} lg={4}>
              <CFormLabel className="mb-1">
                <i>Filtrar clases por ciclo</i>
              </CFormLabel>
              <CFormSelect
                value={cycleId || 0}
                onChange={handleInputChange}
                name="cycleId"
              >
                <option value={0}>Todos</option>
                {cycles && cycles.length !== 0 ? (
                  <>
                    {cycles
                      .filter((c) => c.status)
                      .map((row) => (
                        <option key={row.id} value={row.id}>
                          {row.abbreviation} ciclo
                        </option>
                      ))}
                  </>
                ) : (
                  <></>
                )}
              </CFormSelect>
            </CCol>
            <CCol xs={12} className="mt-3">
              <CFormLabel className="mb-1">
                Clase <ObligatoryField />
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
            <CCol xs={12} lg={4} className="mt-2">
              <CFormLabel className="mb-1">
                Día <ObligatoryField />
              </CFormLabel>
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
            <CCol xs={6} lg={4} className="mt-2">
              <CFormLabel className="mb-1">
                Hora de inicio <ObligatoryField />
              </CFormLabel>
              <CFormInput
                type="time"
                name="startTime"
                onChange={handleInputChange}
                value={values?.startTime || ""}
              />
            </CCol>
            <CCol xs={6} lg={4} className="mt-2">
              <CFormLabel className="mb-1">
                Hora de cierre <ObligatoryField />
              </CFormLabel>
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
