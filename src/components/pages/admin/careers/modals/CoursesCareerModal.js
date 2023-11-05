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

export const CoursesCareerModal = ({
  statusCoursesCareerModal,
  hideCoursesCareerModal,
  dataCareer,
}) => {
  return (
    <CModal
      alignment="center"
      visible={statusCoursesCareerModal}
      onClose={hideCoursesCareerModal}
    >
      <CModalHeader>
        <CModalTitle>Ver cursos</CModalTitle>
      </CModalHeader>
      <CModalBody className="pb-0">
        <CRow className="justify-content-around">
          <CCol xs={6} lg={5}>
            <b>Cursos en esta carrera:</b>
          </CCol>
          <CCol xs={5} className="text-end">
            <b>Total:</b> {dataCareer.courses?.length}
          </CCol>
        </CRow>
        <CRow className="mt-1 justify-content-center">
          <CCol xs={11}>
            <ul className="mt-2">
              {dataCareer.courses?.length !== 0 ? (
                <>
                  {dataCareer.courses?.map((row) => (
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
        <CButton color="dark" onClick={hideCoursesCareerModal}>
          Cancelar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
