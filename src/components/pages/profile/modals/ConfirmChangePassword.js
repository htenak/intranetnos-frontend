import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

export const ConfirmChangePassword = ({
  statusModal,
  hideModal,
  changePassword,
}) => {
  return (
    <CModal alignment="center" visible={statusModal}>
      <CModalHeader>
        <CModalTitle>¿Quieres cambiar tu contraseña?</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Estás a punto de cambiar tu contraseña, ¿deseas confirmar?
      </CModalBody>
      <CModalFooter className="border-0">
        <CButton color="dark" onClick={hideModal}>
          Cancelar
        </CButton>
        <CButton
          color="success"
          className="text-white"
          onClick={changePassword}
        >
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
