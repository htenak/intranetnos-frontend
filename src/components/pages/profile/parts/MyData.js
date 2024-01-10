import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { faEdit, faX } from "@fortawesome/free-solid-svg-icons";
import { updateMyData } from "src/store";

import { FAIcon } from "src/assets/icon/FAIcon";
import { MyPhoto } from "./index";
import { getRoleName } from "src/components/helpers";
import { Button, Space } from "antd";

export const MyData = () => {
  const dispatch = useDispatch();
  const { user, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(user);

  const startEditing = () => {
    setEditing(true);
  };
  const cancelEditing = () => {
    setEditing(false);
    setValues(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const parsedValue = parseInt(value);
      if (parsedValue.toString().length <= 9) {
        setValues({ ...values, [name]: parsedValue.toString() });
      }
    } else {
      // para otros campos no validar
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email?.length < 3) {
      return toast.error("Correo electrónico es inválido");
    }
    if (values.phone?.length < 9) {
      return toast.error("Celular es inválido");
    }
    if (values.nickname?.length < 3) {
      return toast.error("Apodo debe tener al menos 3 caracteres");
    }
    dispatch(updateMyData(values));
  };

  // mostramos errores del estado
  useEffect(() => {
    if (errorMessage !== undefined) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage !== undefined) {
      toast.success(successMessage);
      cancelEditing();
    }
  }, [successMessage]);

  return (
    <>
      <CCard>
        <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
          Mis datos personales
        </CCardHeader>
        <CCardBody>
          <CRow className="justify-content-center">
            <CCol xl={8}>
              <CForm>
                <CRow>
                  <CCol md={6}>
                    <CFormLabel className="mb-1 mt-2">Nombres</CFormLabel>
                    <CFormInput
                      value={user.name}
                      className="input-data-profile"
                      style={{ background: "#eee" }}
                      disabled
                    />
                  </CCol>
                  <CCol sm={4} md={3}>
                    <CFormLabel className="mb-1 mt-2">
                      Apellido paterno
                    </CFormLabel>
                    <CFormInput
                      value={user.lastName1}
                      className="input-data-profile"
                      style={{ background: "#eee" }}
                      disabled
                    />
                  </CCol>
                  <CCol sm={4} md={3}>
                    <CFormLabel className="mb-1 mt-2">
                      Apellido materno
                    </CFormLabel>
                    <CFormInput
                      value={user.lastName2}
                      className="input-data-profile"
                      style={{ background: "#eee" }}
                      disabled
                    />
                  </CCol>
                  <CCol sm={4} md={3}>
                    <CFormLabel className="mb-1 mt-2">DNI</CFormLabel>
                    <CFormInput
                      value={user.dni}
                      className="input-data-profile"
                      style={{ background: "#eee" }}
                      disabled
                    />
                  </CCol>
                  <CCol sm={6} md={6}>
                    <CFormLabel className="mb-1 mt-2">
                      Correo electrónico
                    </CFormLabel>
                    <CFormInput
                      value={values.email || ""}
                      name="email"
                      type="email"
                      onChange={handleInputChange}
                      disabled={editing ? false : true}
                      className="input-data-profile"
                    />
                  </CCol>
                  <CCol xs={6} sm={3} md={3}>
                    <CFormLabel className="mb-1 mt-2">Celular</CFormLabel>
                    <CFormInput
                      type="number"
                      name="phone"
                      value={values.phone || ""}
                      onChange={handleInputChange}
                      disabled={editing ? false : true}
                      placeholder="900000000"
                      className="input-data-profile"
                    />
                  </CCol>
                  <CCol xs={6} sm={3}>
                    <CFormLabel className="mb-1 mt-2">Usuario</CFormLabel>
                    <CFormInput
                      value={user.username}
                      disabled
                      className="input-data-profile "
                      style={{ background: "#eee" }}
                    />
                  </CCol>
                  <CCol sm={6}>
                    <CFormLabel className="mb-1 mt-2">Apodo</CFormLabel>
                    <CFormInput
                      name="nickname"
                      value={values.nickname || ""}
                      onChange={handleInputChange}
                      disabled={editing ? false : true}
                      className="input-data-profile"
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel className="mb-1 mt-2">Cargo</CFormLabel>
                    <CFormInput
                      value={getRoleName(user.role.name)}
                      disabled
                      className="input-data-profile "
                      style={{ background: "#eee" }}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3 mb-3 text-center">
                  <CCol>
                    {!editing ? (
                      <Space>
                        <Button
                          type="primary"
                          onClick={startEditing}
                          style={{ paddingTop: 6 }}
                        >
                          <FAIcon customClass="icon" icon={faEdit} />
                        </Button>
                      </Space>
                    ) : (
                      <Space>
                        <Button
                          type="primary"
                          className="bg-danger"
                          onClick={cancelEditing}
                          style={{ paddingTop: 6 }}
                        >
                          <FAIcon customClass="icon" icon={faX} />
                        </Button>
                        <Button
                          type="primary"
                          style={{ background: "green" }}
                          onClick={handleSubmit}
                        >
                          Actualizar
                        </Button>
                      </Space>
                    )}
                  </CCol>
                </CRow>
              </CForm>
            </CCol>
            {/* componente de foto de perfil */}
            <MyPhoto />
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
