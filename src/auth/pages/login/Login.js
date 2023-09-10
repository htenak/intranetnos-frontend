import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { login } from "src/store";

const Login = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      credentials.username.trim().length !== 0 &&
      credentials.password.length !== 0
    ) {
      dispatch(login(credentials));
    } else {
      toast.error("Algunos campos están vacíos");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{ background: "green" }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs={10} sm={8} lg={4}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h3>NOS INTRANET</h3>
                  <p className="text-medium-emphasis">
                    Ingresa tus credenciales para acceder
                  </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="username"
                      placeholder="Usuario"
                      autoComplete="username"
                      value={credentials.username}
                      onChange={handleInputChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      autoComplete="current-password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      required
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={12} className="text-center">
                      <CButton
                        type="submit"
                        style={{ background: "green", border: 0 }}
                        className="px-4"
                      >
                        Acceder
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
