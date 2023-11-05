import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

export const ConfirmChangeStatus = ({
  statusStatusStudentModal,
  hideStatusStudentModal,
  changeStatus,
  dataStudent,
}) => {
  return (
    <CModal
      alignment="center"
      visible={statusStatusStudentModal}
      onClose={hideStatusStudentModal}
    >
      <CModalHeader>
        <CModalTitle>Cambiar estado de usuario</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>
          Estas a punto de desactivar la cuenta de{" "}
          <b>
            {dataStudent.name} {dataStudent.lastName1} {dataStudent.lastName2}
          </b>
          {", "}
          ¿desea realmente continuar?
        </p>
        <ul className="mt-2">
          <li>El usuario debe ser informado de esta acción</li>
        </ul>
      </CModalBody>
      <CModalFooter className="border-0">
        <CButton color="dark" onClick={hideStatusStudentModal}>
          Cancelar
        </CButton>
        <CButton color="warning" className="text-white" onClick={changeStatus}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
