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
import { saveCareer, updateCareer } from "src/store";
import { ObligatoryField } from "src/components/pages/customComponents";

export const AddCareerModal = ({
  statusAddCareerModal,
  hideAddCareerModal,
  dataCareer,
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
    if (dataCareer?.id) {
      setValues(dataCareer);
    } else {
      setValues(initialStateValues);
    }
  }, [statusAddCareerModal]);

  // elimina description si está vacío
  useEffect(() => {
    if (values.description === "") {
      delete values.description;
    }
  }, [values]);

  // cambios en campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // envío de datos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.name.trim().length === 0) {
      return toast.error("Nombre de carrera inválido");
    }
    if (values.description && values.description.length === 0) {
      return toast.error("Descripción inválida");
    }

    let mod = values;
    mod = {
      ...mod,
      name: mod.name?.toUpperCase(),
    };

    if (parseInt(mod?.id) !== 0) {
      dispatch(updateCareer(mod));
    } else {
      dispatch(saveCareer(mod));
    }
  };

  const hideModal = () => {
    setValues(initialStateValues);
    hideAddCareerModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusAddCareerModal}
      onClose={hideModal}
    >
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          {values?.id !== 0 ? (
            <CModalTitle>Editar carrera</CModalTitle>
          ) : (
            <CModalTitle>Registrar carrera</CModalTitle>
          )}
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={12} className="mt-2">
              <CFormLabel className="mb-1">
                Nombre <ObligatoryField />
              </CFormLabel>
              <CFormInput
                name="name"
                onChange={handleInputChange}
                value={values.name || ""}
                placeholder="Nombre de la carrera"
              />
            </CCol>
            <CCol xs={12} className="mt-2">
              <CFormLabel className="mb-1">
                Descripción {values.description && <ObligatoryField />}
              </CFormLabel>
              <textarea
                className="form-control"
                rows={3}
                name="description"
                onChange={handleInputChange}
                value={values.description || ""}
                placeholder="Descripción de la carrera"
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
