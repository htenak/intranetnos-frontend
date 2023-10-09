import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import { saveCourseType, updateCourseType } from "src/store";

export const AddCourseTypeModal = ({
  statusAddCourseTypeModal,
  hideAddCourseTypeModal,
  dataCourseType,
}) => {
  const dispatch = useDispatch();
  const initialStateValues = {
    id: 0,
    name: "",
    description: "",
  };
  const [values, setValues] = useState(initialStateValues);

  // asigna values (editar)
  useEffect(() => {
    if (dataCourseType?.id) {
      setValues(dataCourseType);
    } else {
      setValues(initialStateValues);
    }
  }, [statusAddCourseTypeModal]);

  // elimina description si está vacío
  useEffect(() => {
    if (values.description === "") {
      delete values.description;
    }
  }, [values]);

  // cambios en campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.toUpperCase() });
  };

  // envío de datos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.name.trim().length === 0) {
      return toast.error("Nombre del tipo de curso inválido");
    }
    if (values.description && values.description.length === 0) {
      return toast.error("Descripción inválida");
    }

    if (parseInt(values?.id) !== 0) {
      dispatch(updateCourseType(values));
    } else {
      dispatch(saveCourseType(values));
    }
  };

  const hideModal = () => {
    setValues(initialStateValues);
    hideAddCourseTypeModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusAddCourseTypeModal}
      onClose={hideModal}
    >
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          {values?.id !== 0 ? (
            <CModalTitle>Editar tipo de curso</CModalTitle>
          ) : (
            <CModalTitle>Registrar tipo de curso</CModalTitle>
          )}
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={12} className="mt-2">
              <CFormLabel className="mb-1">
                Nombre <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                name="name"
                onChange={handleInputChange}
                value={values.name || ""}
                placeholder="Nombre del tipo de curso"
              />
            </CCol>
            <CCol xs={12} className="mt-2">
              <CFormLabel className="mb-1">
                Descripción{" "}
                {values.description && <span className="text-danger">*</span>}
              </CFormLabel>
              <textarea
                className="form-control"
                rows={3}
                name="description"
                onChange={handleInputChange}
                value={values.description || ""}
                placeholder="Descripción del tipo de curso"
              ></textarea>
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
