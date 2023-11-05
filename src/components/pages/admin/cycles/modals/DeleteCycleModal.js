import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useDispatch } from "react-redux";
import { deleteCycle } from "src/store";

export const DeleteCycleModal = ({
  statusDeleteCycleModal,
  hideDeleteCycleModal,
  dataCycle,
}) => {
  const dispatch = useDispatch();

  const confirmDelete = () => {
    dispatch(deleteCycle(dataCycle));
    hideDeleteCycleModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusDeleteCycleModal}
      onClose={hideDeleteCycleModal}
    >
      <CModalHeader style={{ background: "#333", color: "#fff" }}>
        <CModalTitle>Eliminar ciclo</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ background: "#333", color: "#fff" }}>
        <p>
          Estas a punto de eliminar el ciclo <b>{dataCycle.abbreviation}</b>
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
        <CButton color="dark" onClick={hideDeleteCycleModal}>
          Cancelar
        </CButton>
        <CButton color="danger" className="text-white" onClick={confirmDelete}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
