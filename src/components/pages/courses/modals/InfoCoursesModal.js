import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";

export const InfoCoursesModal = ({
  statusInfoCoursesModal,
  hideInfoCoursesModal,
  dataCourseType,
}) => {
  return (
    <CModal
      alignment="center"
      visible={statusInfoCoursesModal}
      onClose={hideInfoCoursesModal}
    >
      <CModalHeader>
        <CModalTitle>Ver cursos</CModalTitle>
      </CModalHeader>
      <CModalBody className="pb-0">
        <CRow className="justify-content-around">
          <CCol xs={6} lg={5}>
            <b>Cursos en este tipo:</b>
          </CCol>
          <CCol xs={5} className="text-end">
            <b>Total:</b> {dataCourseType.courses?.length}
          </CCol>
        </CRow>
        <CRow className="mt-1 justify-content-center">
          <CCol xs={11}>
            <ul className="mt-2">
              {dataCourseType.courses?.length !== 0 ? (
                <>
                  {dataCourseType.courses?.map((row) => (
                    <li key={row.id}>{row.name}</li>
                  ))}
                </>
              ) : (
                <li>Sin cursos</li>
              )}
            </ul>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="mt-0 border-0">
        <CButton color="dark" onClick={hideInfoCoursesModal}>
          Cancelar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
