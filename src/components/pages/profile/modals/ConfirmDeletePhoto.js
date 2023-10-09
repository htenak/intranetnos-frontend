import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyPhoto } from "src/store";

export const ConfirmDeletePhoto = ({ statusModal, hideModal }) => {
  const dispatch = useDispatch();
  const { filename } = useSelector((state) => state.auth?.user);

  const deletePhoto = () => {
    dispatch(deleteMyPhoto());
    hideModal(false);
  };

  return (
    <CModal alignment="center" visible={statusModal}>
      <CModalHeader style={{ background: "#333", color: "#fff" }}>
        <CModalTitle>¿Quieres eliminar tu foto de perfil?</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ background: "#333", color: "#fff" }}>
        Estás a punto de eliminar{" "}
        <i>
          <b>{filename}</b>
        </i>
      </CModalBody>
      <CModalFooter
        className="border-0"
        style={{ background: "#333", color: "#fff" }}
      >
        <CButton color="dark" onClick={() => hideModal(false)}>
          Cancelar
        </CButton>
        <CButton color="danger" className="text-white" onClick={deletePhoto}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
