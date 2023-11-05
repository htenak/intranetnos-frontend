import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useDispatch } from "react-redux";
import { deleteCareer } from "src/store";

export const DeleteCareerModal = ({
  statusDeleteCareerModal,
  hideDeleteCareerModal,
  dataCareer,
}) => {
  const dispatch = useDispatch();

  const confirmDelete = () => {
    dispatch(deleteCareer(dataCareer));
    hideDeleteCareerModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusDeleteCareerModal}
      onClose={hideDeleteCareerModal}
    >
      <CModalHeader style={{ background: "#333", color: "#fff" }}>
        <CModalTitle>Eliminar carrera</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ background: "#333", color: "#fff" }}>
        <p>
          Estas a punto de eliminar la carrera de <b>{dataCareer.name}</b>
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
        <CButton color="dark" onClick={hideDeleteCareerModal}>
          Cancelar
        </CButton>
        <CButton color="danger" className="text-white" onClick={confirmDelete}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
