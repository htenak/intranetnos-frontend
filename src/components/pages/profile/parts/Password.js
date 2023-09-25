import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from "@coreui/react";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { updateMyData } from "src/store";

import { ConfirmChangePassword } from "../modals";

export const Password = () => {
  const dispatch = useDispatch();

  const initialState = {
    password: "",
  };
  const initialPasswords = {
    password1: "",
    password2: "",
  };

  const [passwords, setPasswords] = useState(initialPasswords);
  const [values, setValues] = useState(initialState);
  const [statusModal, setStatusModal] = useState(false);

  useEffect(() => {
    if (passwords.password2.length >= 4) {
      setValues({ ...values, password: passwords.password2 });
    }
  }, [passwords.password2]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.password1 !== passwords.password2) {
      setValues(initialState);
      return toast.error("Las contraseñas no coinciden");
    }
    if (values.password.length < 4) {
      return toast.error("Las contraseñas deben tener 4 o más caracteres");
    }
    // abre el modal de confirmacion
    setStatusModal(true);
  };

  const changePassword = () => {
    dispatch(updateMyData(values));
    hideModal();
  };

  const hideModal = () => {
    setPasswords(initialPasswords);
    setValues(initialState);
    setStatusModal(false);
  };

  return (
    <>
      <CCard>
        <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
          Cambiar mi contraseña
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol>
                <span>
                  <b>¡Importante!</b>
                </span>
                <ul>
                  <li>
                    Si en caso olvidas tu contraseña debes acudir con un
                    <b title="Usuario de mayor jerarquía">
                      {" "}
                      administrador del sistema
                    </b>{" "}
                    para la recuperación de tu{" "}
                    <b title="Cuenta de usuario">cuenta</b>
                  </li>
                  <li>Tu nueva contraseña debe tener 4 o más caracteres</li>
                  <li>Utiliza una contraseña que recuerdes</li>
                </ul>
              </CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol sm={6} lg={5}>
                <CFormLabel className="mb-1">Nueva contraseña</CFormLabel>
                <CFormInput
                  type="password"
                  placeholder="Ingresa nueva contraseña"
                  name="password1"
                  onChange={handleInputChange}
                  value={passwords.password1 || ""}
                />
              </CCol>
              <CCol sm={6} lg={5}>
                <CFormLabel className="mb-1 mt-2 mt-sm-0">
                  Confirma la contraseña
                </CFormLabel>
                <CFormInput
                  type="password"
                  placeholder="Repite la contraseña"
                  name="password2"
                  onChange={handleInputChange}
                  value={passwords.password2 || ""}
                />
              </CCol>
              <CCol
                lg={2}
                className="align-self-end text-center text-lg-start text-sm-end"
              >
                <CButton
                  color="success"
                  className="mt-2 mt-lg-0 text-white"
                  type="submit"
                >
                  Confirmar
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
      <ConfirmChangePassword
        statusModal={statusModal}
        hideModal={hideModal}
        changePassword={changePassword}
      />
    </>
  );
};
