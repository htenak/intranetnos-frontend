import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
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
import {
  getAllCareers,
  getAllCourseTypes,
  saveCourse,
  updateCourse,
} from "src/store";

export const AddCourseModal = ({
  statusAddCourseModal,
  hideAddCourseModal,
  dataCourse,
}) => {
  const dispatch = useDispatch();
  const { courseTypes, careers } = useSelector((state) => state.academic);
  const initialStateValues = {
    id: 0,
    name: "",
    abbreviation: "",
    courseTypeId: 0,
    careerId: null,
  };
  const initialStateCheckeds = {
    careerId: false,
  };
  const [values, setValues] = useState(initialStateValues);
  const [checkeds, setCheckeds] = useState(initialStateCheckeds);

  // consulta datos
  useEffect(() => {
    if (statusAddCourseModal) {
      dispatch(getAllCourseTypes());
      dispatch(getAllCareers());
    }
  }, [statusAddCourseModal]);

  // asigna values (editar)
  useEffect(() => {
    if (dataCourse?.id) {
      setValues(dataCourse);
      if (dataCourse.careerId) {
        setCheckeds({ ...checkeds, careerId: true });
      }
    } else {
      setValues(initialStateValues);
      setCheckeds(initialStateCheckeds);
    }
  }, [statusAddCourseModal]);

  // cambios en campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "abbreviation" || name === "name") {
      setValues({ ...values, [name]: value.toUpperCase() });
    } else if (name === "courseTypeId" || name === "careerId") {
      setValues({ ...values, [name]: parseInt(value) });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  // cambios en checks
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "careerId") {
      setCheckeds({ ...checkeds, [name]: !checked ? false : true });
      setValues({ ...values, [name]: !checked ? null : 0 });
    }
  };

  // envío de datos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.abbreviation.trim().length === 0) {
      return toast.error("Abreviación inválida");
    }
    if (values.courseTypeId === 0) {
      return toast.error("Tipo de curso inválido");
    }
    if (checkeds.careerId && values.careerId === 0) {
      return toast.error("Carrera no seleccionada");
    }
    if (values.name.trim().length === 0) {
      return toast.error("Nombre del curso inválido");
    }

    if (parseInt(values?.id) !== 0) {
      dispatch(updateCourse(values));
    } else {
      dispatch(saveCourse(values));
    }
  };

  const hideModal = () => {
    setValues(initialStateValues);
    setCheckeds(initialStateCheckeds);
    hideAddCourseModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusAddCourseModal}
      onClose={hideModal}
      size="lg"
    >
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          {values?.id !== 0 ? (
            <CModalTitle>Editar curso</CModalTitle>
          ) : (
            <CModalTitle>Registrar curso</CModalTitle>
          )}
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={5} className="mt-2">
              <CFormLabel className="mb-1">
                Abreviación <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                name="abbreviation"
                onChange={handleInputChange}
                value={values.abbreviation || ""}
                placeholder="Nombre del curso"
              />
            </CCol>
            <CCol className="mt-2">
              <CFormLabel className="mb-1">
                Tipo de curso <span className="text-danger">*</span>
              </CFormLabel>
              <CFormSelect
                value={values.courseTypeId || 0}
                onChange={handleInputChange}
                name="courseTypeId"
              >
                <option value={0} disabled>
                  Seleccionar
                </option>
                {courseTypes && courseTypes.length !== 0 ? (
                  courseTypes.map((row) => (
                    <option key={row.id} value={row.id}>
                      {row.name} / {row.description}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </CFormSelect>
            </CCol>
            <CCol xs={12} className="mt-2">
              <CFormLabel className="mb-1">
                Nombre <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                name="name"
                onChange={handleInputChange}
                value={values.name || ""}
                placeholder="Nombre del curso"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol className="mt-2">
              <CFormLabel className="mb-1">
                ¿Es de carrera?{" "}
                <CFormCheck
                  style={{
                    marginLeft: 8,
                    border: "1px solid green",
                  }}
                  checked={checkeds.careerId}
                  onChange={handleCheckboxChange}
                  name="careerId"
                />
              </CFormLabel>
              <CFormSelect
                value={values.careerId || 0}
                onChange={handleInputChange}
                name="careerId"
                disabled={values.careerId === null}
              >
                <option value={0} disabled>
                  Seleccionar carrera *
                </option>
                {careers && careers.length !== 0 ? (
                  careers.map((row) => (
                    <option key={row.id} value={row.id}>
                      {row.name} / {row.description}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </CFormSelect>
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
