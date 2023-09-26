import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

export const ConfirmDeleteStudent = ({
  statusDeleteStudentModal,
  hideDeleteStudentModal,
  removeStudent,
  dataStudent,
}) => {
  return (
    <CModal
      alignment="center"
      visible={statusDeleteStudentModal}
      onClose={hideDeleteStudentModal}
    >
      <CModalHeader>
        <CModalTitle>Eliminar cuenta de usuario</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>
          Estas a punto de eliminar la cuenta de{" "}
          <b>
            {dataStudent.name} {dataStudent.lastName1} {dataStudent.lastName2}
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
        <CButton color="dark" onClick={hideDeleteStudentModal}>
          Cancelar
        </CButton>
        <CButton color="danger" className="text-white" onClick={removeStudent}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
