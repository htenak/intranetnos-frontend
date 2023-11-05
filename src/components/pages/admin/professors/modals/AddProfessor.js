import {
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
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FAIcon } from "src/assets/icon/FAIcon";
import { saveProfessor, updateProfessor } from "src/store";

export const AddProfessor = ({
  statusAddProfessorModal,
  hideAddProfessorModal,
  dataProfessor,
}) => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.users);

  const initialStateValues = {
    id: 0,
    name: "",
    lastName1: "",
    lastName2: "",
    dni: "",
    email: "",
    phone: "",
    roleId: 0,
  };
  const [values, setValues] = useState(initialStateValues);

  // asigna values (editar)
  useEffect(() => {
    if (dataProfessor?.id) {
      setValues(dataProfessor);
    } else {
      setValues(initialStateValues);
    }
  }, [statusAddProfessorModal]);

  // asigna rol 'professor' por defecto
  useEffect(() => {
    if (statusAddProfessorModal) {
      if (!dataProfessor?.id) {
        const roleFound = roles?.find((row) => row.name === "professor");
        setValues({ ...values, roleId: roleFound.id });
      }
    }
  }, [statusAddProfessorModal]);

  // elimina email si está vacío
  useEffect(() => {
    if (values.email === "") {
      delete values.email;
    }
  }, [values]);

  // cambios en campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "roleId") {
      setValues({ ...values, [name]: parseInt(value) });
    } else if (name === "dni") {
      if (value.length <= 8) {
        setValues({ ...values, [name]: value });
      }
    } else if (name === "phone") {
      const parsedValue = parseInt(value);
      if (parsedValue.toString().length <= 9) {
        setValues({ ...values, [name]: parsedValue.toString() });
      }
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  // envío de datos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.roleId === 0) {
      return toast.error("Tipo de usuario inválido");
    }
    if (values.name.trim().length === 0) {
      return toast.error("Nombres inválido");
    }
    if (values.lastName1.trim().length < 1) {
      return toast.error("Apellido paterno inválido");
    }
    if (values.lastName2.trim().length < 1) {
      return toast.error("Apellido materno inválido");
    }
    if (values.dni.trim().length < 8) {
      return toast.error("DNI inválido");
    }
    if (values.email && values.email.length === 0) {
      return toast.error("Correo inválido");
    }
    if (values.phone.trim().length < 9) {
      return toast.error("Celular inválido");
    }

    if (parseInt(values?.id) !== 0) {
      dispatch(updateProfessor(values));
    } else {
      dispatch(saveProfessor(values));
    }
  };

  const hideModal = () => {
    setValues(initialStateValues);
    hideAddProfessorModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusAddProfessorModal}
      onClose={hideModal}
      size="lg"
    >
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          {values?.id !== 0 ? (
            <CModalTitle>Editar profesor</CModalTitle>
          ) : (
            <CModalTitle>Registrar profesor</CModalTitle>
          )}
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={9} lg={5}>
              <CFormSelect
                value={values.roleId}
                onChange={handleInputChange}
                name="roleId"
                disabled
              >
                <option value={0} disabled>
                  Tipo de usuario *
                </option>
                {roles
                  ?.filter((role) => role.name !== "user")
                  .map((row) => (
                    <option key={row.id} value={row.id}>
                      {row.name === "admin" && "ADMINISTRADOR"}
                      {row.name === "professor" && "PROFESOR"}
                      {row.name === "student" && "ESTUDIANTE"}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol xs={1} className="align-self-center">
              <FAIcon customClass="fs-4 text-dark" icon={faUserCog} />
            </CCol>
          </CRow>
          <CRow className="mt-2">
            <CCol xs={12} sm={6} lg={4} className="mt-2">
              <CFormLabel className="mb-1">
                Nombres <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                name="name"
                onChange={handleInputChange}
                value={values.name || ""}
                placeholder="Nombres"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={4} className="mt-2">
              <CFormLabel className="mb-1">
                Apellido paterno <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                name="lastName1"
                onChange={handleInputChange}
                value={values.lastName1 || ""}
                placeholder="Apellido paterno"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={4} className="mt-2">
              <CFormLabel className="mb-1">
                Apellido materno <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                name="lastName2"
                onChange={handleInputChange}
                value={values.lastName2 || ""}
                placeholder="Apellido materno"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3} className="mt-2">
              <CFormLabel className="mb-1">
                DNI <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                type="number"
                name="dni"
                onChange={handleInputChange}
                value={values.dni || ""}
                placeholder="8 dígitos"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={6} className="mt-2">
              <CFormLabel className="mb-1">
                Correo electrónico{" "}
                {values.email && <span className="text-danger">*</span>}
              </CFormLabel>
              <CFormInput
                type="email"
                name="email"
                onChange={handleInputChange}
                value={values.email || ""}
                placeholder="ejemplo@ejemplo.com"
              />
            </CCol>
            <CCol xs={12} sm={6} lg={3} className="mt-2">
              <CFormLabel className="mb-1">
                Celular <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                type="number"
                name="phone"
                value={values.phone || ""}
                onChange={handleInputChange}
                placeholder="9 dígitos"
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          {values?.id !== 0 ? (
            <CCol className="text-dark">
              <span>
                <b>Nota: </b> El DNI se convierte en la contraseña al cambiarlo.
              </span>
            </CCol>
          ) : (
            <></>
          )}
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
