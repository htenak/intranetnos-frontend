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
import { updateMyData } from "src/store";

export const ConfirmDeletePhoto = ({ statusModal, hideModal }) => {
  const dispatch = useDispatch();
  const { filename } = useSelector((state) => state.auth?.user);

  const deletePhoto = () => {
    dispatch(updateMyData({ filename: null }));
    hideModal(false);
  };

  return (
    <CModal alignment="center" visible={statusModal}>
      <CModalHeader>
        <CModalTitle>¿Quieres eliminar tu foto de perfil?</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Estás a punto de eliminar{" "}
        <i>
          <b>{filename}</b>
        </i>
      </CModalBody>
      <CModalFooter className="border-0">
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
