import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useDispatch } from "react-redux";
import { deleteCourseType } from "src/store";

export const DeleteCourseTypeModal = ({
  statusDeleteCourseTypeModal,
  hideDeleteCourseTypeModal,
  dataCourseType,
}) => {
  const dispatch = useDispatch();

  const confirmDelete = () => {
    dispatch(deleteCourseType(dataCourseType));
    hideDeleteCourseTypeModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusDeleteCourseTypeModal}
      onClose={hideDeleteCourseTypeModal}
    >
      <CModalHeader style={{ background: "#333", color: "#fff" }}>
        <CModalTitle>Eliminar tipo de curso</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ background: "#333", color: "#fff" }}>
        <p>
          Estas a punto de eliminar el tipo de curso{" "}
          <b>{dataCourseType.name}</b>
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
        <CButton color="dark" onClick={hideDeleteCourseTypeModal}>
          Cancelar
        </CButton>
        <CButton color="danger" className="text-white" onClick={confirmDelete}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
