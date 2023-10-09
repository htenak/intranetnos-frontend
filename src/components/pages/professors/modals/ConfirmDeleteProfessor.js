import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

export const ConfirmDeleteProfessor = ({
  statusDeleteProfessorModal,
  hideDeleteProfessorModal,
  removeProfessor,
  dataProfessor,
}) => {
  const handleSubmit = () => {
    removeProfessor();
    hideDeleteProfessorModal();
  };
  return (
    <CModal
      alignment="center"
      visible={statusDeleteProfessorModal}
      onClose={hideDeleteProfessorModal}
    >
      <CModalHeader style={{ background: "#333", color: "#fff" }}>
        <CModalTitle>Eliminar cuenta de usuario</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ background: "#333", color: "#fff" }}>
        <p>
          Estas a punto de eliminar la cuenta de{" "}
          <b>
            {dataProfessor.name} {dataProfessor.lastName1}{" "}
            {dataProfessor.lastName2}
          </b>
          {", "}
          ¿desea realmente continuar?
        </p>
        <ul className="mt-2">
          <li>El usuario debe ser informado de esta acción</li>
          <li>Esta acción no se puede deshacer</li>
        </ul>
      </CModalBody>
      <CModalFooter
        className="border-0"
        style={{ background: "#333", color: "#fff" }}
      >
        <CButton color="dark" onClick={hideDeleteProfessorModal}>
          Cancelar
        </CButton>
        <CButton color="danger" className="text-white" onClick={handleSubmit}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
