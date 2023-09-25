import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

export const ConfirmDeleteUser = ({
  statusDeleteUserModal,
  hideDeleteUserModal,
  removeUser,
  dataUser,
}) => {
  return (
    <CModal
      alignment="center"
      visible={statusDeleteUserModal}
      onClose={hideDeleteUserModal}
    >
      <CModalHeader>
        <CModalTitle>Eliminar cuenta de usuario</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>
          Estas a punto de eliminar la cuenta de{" "}
          <b>
            {dataUser.name} {dataUser.lastName1} {dataUser.lastName2}
          </b>
          {", "}
          ¿desea realmente continuar?
        </p>
        <ul className="mt-2">
          <li>El usuario debe ser informado de esta acción</li>
          <li>Esta acción no se puede deshacer</li>
        </ul>
      </CModalBody>
      <CModalFooter className="border-0">
        <CButton color="dark" onClick={hideDeleteUserModal}>
          Cancelar
        </CButton>
        <CButton color="danger" className="text-white" onClick={removeUser}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
