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
import { saveCycle, updateCycle } from "src/store";

export const AddCycleModal = ({
  statusAddCycleModal,
  hideAddCycleModal,
  dataCycle,
}) => {
  const dispatch = useDispatch();
  const initialStateValues = {
    id: 0,
    abbreviation: "",
    startDate: "",
    endDate: "",
    description: "",
  };
  const [values, setValues] = useState(initialStateValues);

  // asigna values (editar)
  useEffect(() => {
    if (dataCycle?.id) {
      setValues(dataCycle);
    } else {
      setValues(initialStateValues);
    }
  }, [statusAddCycleModal]);

  // cambios en campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "abbreviation") {
      setValues({ ...values, [name]: value.toUpperCase() });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  // envío de datos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.abbreviation.trim().length === 0) {
      return toast.error("Abreviatura inválida");
    }
    if (values.startDate.length === 0) {
      return toast.error("Fecha de inicio inválida");
    }
    if (values.endDate.length === 0) {
      return toast.error("Fecha de cierre inválida");
    }
    if (values.description.length === 0) {
      return toast.error("Descripción inválida");
    }

    if (parseInt(values?.id) !== 0) {
      dispatch(updateCycle(values));
    } else {
      dispatch(saveCycle(values));
    }
  };

  const hideModal = () => {
    setValues(initialStateValues);
    hideAddCycleModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusAddCycleModal}
      onClose={hideModal}
      size="lg"
    >
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          {values?.id !== 0 ? (
            <CModalTitle>Editar ciclo</CModalTitle>
          ) : (
            <CModalTitle>Registrar ciclo</CModalTitle>
          )}
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={12} sm={4} className="mt-2">
              <CFormLabel className="mb-1">
                Abreviatura <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                name="abbreviation"
                onChange={handleInputChange}
                value={values.abbreviation || ""}
                placeholder="I, II, III, IV, ..."
              />
            </CCol>
            <CCol xs={12} sm={4} className="mt-2">
              <CFormLabel className="mb-1">
                Fecha de inicio <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                type="date"
                name="startDate"
                onChange={handleInputChange}
                value={values.startDate || ""}
              />
            </CCol>
            <CCol xs={12} sm={4} className="mt-2">
              <CFormLabel className="mb-1">
                Fecha de cierre <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                type="date"
                name="endDate"
                onChange={handleInputChange}
                value={values.endDate || ""}
              />
            </CCol>
            <CCol xs={12} className="mt-2">
              <CFormLabel className="mb-1">
                Descripción <span className="text-danger">*</span>
              </CFormLabel>
              <textarea
                className="form-control"
                rows={2}
                name="description"
                onChange={handleInputChange}
                value={values.description || ""}
                placeholder="Descripción del ciclo"
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
