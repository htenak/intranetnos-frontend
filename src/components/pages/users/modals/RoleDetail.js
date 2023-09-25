import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

export const RoleDetail = ({ statusModal, hideModal, roleDetail }) => {
  console.log(roleDetail, "en modal");
  return (
    <CModal alignment="center" visible={statusModal} onClose={hideModal}>
      <CModalHeader>
        <CModalTitle>Detalles de rol</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>{roleDetail.detail}</p>
        <p>{roleDetail.accessTo}</p>
        <ul>
          {roleDetail.accessDetail?.map((row, index) => (
            <li key={index}>{row}</li>
          ))}
        </ul>
      </CModalBody>
      <CModalFooter className="border-0">
        <CButton color="dark" onClick={hideModal}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
