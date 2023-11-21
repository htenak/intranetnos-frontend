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
import {
  getAllCareers,
  getAllClassroomsCareerByCareerId,
  getAllCourses,
  getAllCycles,
  getAllProfessors,
  saveClass,
  updateClass,
} from "src/store";
import { ObligatoryField, SelectSearch } from "../../../customComponents";
import {
  faBookReader,
  faChalkboardTeacher,
  faGraduationCap,
  faProjectDiagram,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import { element } from "prop-types";

export const AddClassModal = ({
  statusAddClassModal,
  hideAddClassModal,
  dataClass,
}) => {
  const dispatch = useDispatch();
  const { careers, classroomsCareerByCareerId, cycles, courses } = useSelector(
    (state) => state.academic
  );
  const { professors } = useSelector((state) => state.professors);
  const initialStateValues = {
    id: 0,
    cycleId: 0,
    careerId: 0,
    classroomCareerId: 0,
    courseId: 0,
    professorUserId: 0,
    denomination: "",
  };
  const [values, setValues] = useState(initialStateValues);
  const [searchCycles, setSearchCycles] = useState([]);
  const [searchCareers, setSearchCareers] = useState([]);
  const [searchClassroomsCareer, setSearchClassroomsCareer] = useState([]);
  const [searchProfessors, setSearchProfessors] = useState([]);
  const [searchCourses, setSearchCourses] = useState([]);

  // consulta datos
  useEffect(() => {
    if (statusAddClassModal) {
      dispatch(getAllCareers());
      dispatch(getAllCycles());
      dispatch(getAllCourses());
      dispatch(getAllProfessors());
    }
  }, [statusAddClassModal]);

  // asigna denominacion de la clase
  useEffect(() => {
    const cycle = searchCycles?.find((i) => i.id == values.cycleId);
    const course = searchCourses?.find((i) => i.id == values.courseId);
    const professor = searchProfessors?.find(
      (i) => i.id == values.professorUserId
    );
    const cc = searchClassroomsCareer?.find(
      (i) => i.id == values.classroomCareerId
    );
    setValues({
      ...values,
      denomination: `${cycle ? `${cycle.abbreviation} ciclo` : "ciclo"} - ${
        course ? course.name : "curso"
      } - ${
        professor
          ? professor.name +
            " " +
            professor.lastName1 +
            " " +
            professor.lastName2
          : "profesor"
      } | ${cc ? cc.denomination.split("-")[0] : "aula"}`,
    });
  }, [
    values?.cycleId,
    values?.courseId,
    values?.professorUserId,
    values?.classroomCareerId,
    searchCycles,
    searchClassroomsCareer,
    searchCourses,
    searchProfessors,
  ]);

  // asigna values (editar)
  useEffect(() => {
    if (dataClass?.id) {
      setValues(dataClass);
    } else {
      setValues(initialStateValues);
    }
  }, [statusAddClassModal]);

  // asigno ciclos para el campo
  useEffect(() => {
    if (cycles) {
      if (cycles.length !== 0) {
        setSearchCycles(
          cycles
            .map((cycle) => ({
              ...cycle,
              value: cycle.id,
              label: cycle.abbreviation,
            }))
            .filter((c) => c.status)
        );
      } else {
        setSearchCycles([]);
      }
    }
  }, [cycles]);

  // asigno carreras para el campo
  useEffect(() => {
    if (careers) {
      if (careers.length !== 0) {
        setSearchCareers(
          careers.map((career) => ({
            ...career,
            value: career.id,
            label: career.name,
          }))
        );
      } else {
        setSearchCareers([]);
      }
    }
  }, [careers]);

  // asingo aulas de la carrera seleccionada para el campo
  useEffect(() => {
    if (classroomsCareerByCareerId) {
      if (classroomsCareerByCareerId.length !== 0) {
        setSearchClassroomsCareer(
          classroomsCareerByCareerId
            .map((cc) => ({
              ...cc,
              value: cc.id,
              label: `N° ${cc.classroom.number} - ${cc.classroom.description}`,
            }))
            .filter((cc) => cc.careerId === values.careerId && cc.status)
        );
      } else {
        setSearchClassroomsCareer([]);
      }
    }
  }, [classroomsCareerByCareerId]);

  // asigno profesores para el campo
  useEffect(() => {
    if (professors) {
      if (professors.length !== 0) {
        setSearchProfessors(
          professors
            .map((professor) => ({
              ...professor,
              value: professor.id,
              label: `${professor.name} ${professor.lastName1} ${professor.lastName2}`,
            }))
            .filter((p) => p.status)
        );
      } else {
        setSearchProfessors([]);
      }
    }
  }, [professors]);

  // asigno cursos para el campo
  useEffect(() => {
    if (values.careerId !== 0) {
      dispatch(getAllClassroomsCareerByCareerId(values.careerId));
      if (courses) {
        if (courses.length !== 0) {
          setSearchCourses(
            courses
              .map((course) => ({
                ...course,
                value: course.id,
                label: course.name,
              }))
              // filtro los cursos activos de la carrera y cursos activos sin carrera
              .filter(
                (c) =>
                  (c.careerId === values.careerId || !c.careerId) && c.status
              )
              // sorteo cursos de carrera al inicio
              .sort((a, b) => b.careerId)
          );
        } else {
          setSearchCourses([]);
        }
      }
    }
  }, [values?.careerId, courses]);

  // cambios en ciclo
  const handleChangeCycle = (element) => {
    setValues({
      ...values,
      cycleId: element.id,
      cycleName: element.abbreviation,
    });
  };

  // cambios en professor
  const handleChangeProfessor = (element) => {
    setValues({
      ...values,
      professorUserId: element.id,
    });
  };

  // cambios en carrera
  const handleChangeCareer = (element) => {
    setValues({
      ...values,
      careerId: element.id,
      courseId: element.id !== values.careerId ? 0 : values.courseId,
    });
  };

  const handleChangeClassroomCareer = (element) => {
    setValues({ ...values, classroomCareerId: element.id });
  };

  // cambios en curso
  const handleChangeCourse = (element) => {
    setValues({
      ...values,
      courseId: element.id,
    });
  };

  // envío de datos
  const handleSubmit = (e) => {
    e.preventDefault();

    if (values?.cycleId === 0) {
      return toast.error("Ciclo es obligatorio");
    }
    if (values?.professorUserId === 0) {
      return toast.error("Profesor(a) es obligatorio");
    }
    if (values?.careerId === 0) {
      return toast.error("Carrera es obligatorio");
    }
    if (values?.courseId === 0) {
      return toast.error("Curso es obligatorio");
    }

    if (values?.id !== 0) {
      dispatch(updateClass(values));
    } else {
      dispatch(saveClass(values));
    }
  };

  const hideModal = () => {
    setValues(initialStateValues);
    setSearchCourses([]);
    hideAddClassModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusAddClassModal}
      onClose={hideModal}
      size="lg"
    >
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          {values?.id !== 0 ? (
            <CModalTitle>Editar clase</CModalTitle>
          ) : (
            <CModalTitle>Registrar clase</CModalTitle>
          )}
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm={3} className="mt-2">
              <CFormLabel className="mb-1">
                Ciclo <ObligatoryField />
              </CFormLabel>
              <SelectSearch
                value={
                  (searchCycles &&
                    searchCycles.find(
                      (element) => element.value === values.cycleId
                    )) ||
                  ""
                }
                placeholder={"Buscar ciclo"}
                options={searchCycles}
                icon={faProjectDiagram}
                noResultsMessage={"Ciclo no encontrado"}
                onChange={handleChangeCycle}
              />
            </CCol>
            <CCol sm={9} className="mt-2">
              <CFormLabel className="mb-1">
                {"Profesor(a)"} <ObligatoryField />
              </CFormLabel>
              <SelectSearch
                value={
                  (searchProfessors &&
                    searchProfessors.find(
                      (element) => element.value === values.professorUserId
                    )) ||
                  ""
                }
                placeholder={"Buscar professor"}
                options={searchProfessors}
                icon={faChalkboardTeacher}
                noResultsMessage={"Profesor no encontrado"}
                onChange={handleChangeProfessor}
              />
            </CCol>
            <CCol xs={12} lg={7} className="mt-2">
              <CFormLabel className="mb-1">
                Carrera <ObligatoryField />
              </CFormLabel>
              <SelectSearch
                value={
                  (searchCareers &&
                    searchCareers.find(
                      (element) => element.value === values.careerId
                    )) ||
                  ""
                }
                placeholder="Buscar carrera"
                options={searchCareers}
                icon={faGraduationCap}
                noResultsMessage={"Carrera no encontrada"}
                onChange={handleChangeCareer}
              />
            </CCol>
            <CCol xs={12} lg={5} className="mt-2">
              <CFormLabel className="mb-1">
                Aula <ObligatoryField />
              </CFormLabel>
              <SelectSearch
                value={
                  (searchClassroomsCareer &&
                    searchClassroomsCareer.find(
                      (element) => element.value === values.classroomCareerId
                    )) ||
                  ""
                }
                placeholder="Buscar aula"
                options={searchClassroomsCareer}
                icon={faSitemap}
                noResultsMessage={"Aula no encontrada"}
                onChange={handleChangeClassroomCareer}
              />
            </CCol>
            <CCol xs={12} className="mt-2">
              <CFormLabel className="mb-1">
                Curso <ObligatoryField />
              </CFormLabel>
              <SelectSearch
                value={
                  (searchCourses &&
                    searchCourses.find(
                      (element) => element.value === values.courseId
                    )) ||
                  ""
                }
                placeholder="Buscar curso"
                options={searchCourses}
                icon={faBookReader}
                noResultsMessage={
                  !values.careerId
                    ? "Selecciona la carrera"
                    : "Curso no encontrado"
                }
                onChange={handleChangeCourse}
              />
            </CCol>
            <CCol xs={12} className="mt-2">
              <CFormLabel className="mb-1">Denominación</CFormLabel>
              <CFormInput disabled value={values.denomination || ""} />
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
