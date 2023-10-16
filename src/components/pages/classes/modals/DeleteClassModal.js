import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useDispatch } from "react-redux";
import { deleteClass } from "src/store";

export const DeleteClassModal = ({
  statusDeleteClassModal,
  hideDeleteClassModal,
  dataClass,
}) => {
  const dispatch = useDispatch();

  const confirmDelete = () => {
    dispatch(deleteClass(dataClass));
    hideDeleteClassModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusDeleteClassModal}
      onClose={hideDeleteClassModal}
    >
      <CModalHeader style={{ background: "#333", color: "#fff" }}>
        <CModalTitle>Eliminar clase</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ background: "#333", color: "#fff" }}>
        <p>
          Estas a punto de eliminar la clase <b>{dataClass.denomination}</b>
          {", "}
          ¿desea realmente continuar?
        </p>
        <ul className="mt-2">
          <li>Esta acción no se puede deshacer</li>
        </ul>
      </CModalBody>
      <CModalFooter
        className="border-0"
        style={{ background: "#333", color: "#fff" }}
      >
        <CButton color="dark" onClick={hideDeleteClassModal}>
          Cancelar
        </CButton>
        <CButton color="danger" className="text-white" onClick={confirmDelete}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
