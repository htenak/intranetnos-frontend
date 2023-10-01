import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

export const ConfirmChangeStatus = ({
  statusStatusProfessorModal,
  hideStatusProfessorModal,
  changeStatus,
  dataProfessor,
}) => {
  return (
    <CModal
      alignment="center"
      visible={statusStatusProfessorModal}
      onClose={hideStatusProfessorModal}
    >
      <CModalHeader>
        <CModalTitle>Cambiar estado de usuario</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>
          Estas a punto de desactivar la cuenta de{" "}
          <b>
            {dataProfessor.name} {dataProfessor.lastName1}{" "}
            {dataProfessor.lastName2}
          </b>
          {", "}
          ¿desea realmente continuar?
        </p>
        <ul className="mt-2">
          <li>El usuario debe ser informado de esta acción</li>
        </ul>
      </CModalBody>
      <CModalFooter className="border-0">
        <CButton color="dark" onClick={hideStatusProfessorModal}>
          Cancelar
        </CButton>
        <CButton color="warning" className="text-white" onClick={changeStatus}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
