import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useDispatch } from "react-redux";
import { hourAmPmFormat } from "src/components/helpers/hourAmPmFormat";
import { deleteSchedule } from "src/store";

export const DeleteScheduleModal = ({
  statusDeleteScheduleModal,
  hideDeleteScheduleModal,
  dataSchedule,
}) => {
  const dispatch = useDispatch();

  const confirmDelete = () => {
    dispatch(deleteSchedule(dataSchedule));
    hideDeleteScheduleModal();
  };

  return (
    <CModal
      alignment="center"
      visible={statusDeleteScheduleModal}
      onClose={hideDeleteScheduleModal}
    >
      <CModalHeader style={{ background: "#333", color: "#fff" }}>
        <CModalTitle>Eliminar clase</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ background: "#333", color: "#fff" }}>
        <p>
          Estas a punto de eliminar el horario de{" "}
          <b>{hourAmPmFormat(dataSchedule.startTime)}</b> a{" "}
          <b>{hourAmPmFormat(dataSchedule.endTime)}</b> para la clase{" "}
          <b>{dataSchedule.classs?.denomination}</b>
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
        <CButton color="dark" onClick={hideDeleteScheduleModal}>
          Cancelar
        </CButton>
        <CButton color="danger" className="text-white" onClick={confirmDelete}>
          Confirmar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
