import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

export const ConfirmChangeStatus = ({
  statusStatusUserModal,
  hideStatusUserModal,
  changeStatus,
  dataUser,
}) => {
  return (
    <CModal
      alignment="center"
      visible={statusStatusUserModal}
      onClose={hideStatusUserModal}
    >
      <CModalHeader>
        <CModalTitle>Cambiar estado de usuario</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>
          Estas a punto de desactivar la cuenta de{" "}
          <b>
            {dataUser.name} {dataUser.lastName1} {dataUser.lastName2}
          </b>
          {", "}
          ¿desea realmente continuar?
        </p>
        <ul className="mt-2">
          <li>El usuario debe ser informado de esta acción</li>
        </ul>
      </CModalBody>
      <CModalFooter className="border-0">
        <CButton color="dark" onClick={hideStatusUserModal}>
          Cancelar
        </CButton>
        <CButton color="success" className="text-white" onClick={changeStatus}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
