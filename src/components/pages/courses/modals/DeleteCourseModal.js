import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useDispatch } from "react-redux";
import { deleteCourse } from "src/store";

export const DeleteCourseModal = ({
  statusDeleteCourseModal,
  hideDeleteCourseModal,
  dataCourse,
}) => {
  const dispatch = useDispatch();

  const confirmDelete = () => {
    dispatch(deleteCourse(dataCourse));
    hideDeleteCourseModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusDeleteCourseModal}
      onClose={hideDeleteCourseModal}
    >
      <CModalHeader style={{ background: "#333", color: "#fff" }}>
        <CModalTitle>Eliminar curso</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ background: "#333", color: "#fff" }}>
        <p>
          Estas a punto de eliminar el curso <b>{dataCourse.name}</b>
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
        <CButton color="dark" onClick={hideDeleteCourseModal}>
          Cancelar
        </CButton>
        <CButton color="danger" className="text-white" onClick={confirmDelete}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
