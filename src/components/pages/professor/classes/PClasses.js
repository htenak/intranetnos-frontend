import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CCardTitle,
  CCardFooter,
} from "@coreui/react";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FAIcon } from "src/assets/icon/FAIcon";
import Loader from "src/components/layout/loader/Loader";
import { getAllClassesProfessor } from "src/store";

const PClasses = () => {
  const dispatch = useDispatch();
  const { classesProfessor } = useSelector((state) => state.classesProfessor);

  useEffect(() => {
    dispatch(getAllClassesProfessor());
  }, []);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CCardTitle className="fs-4">Clases que tienes asignadas</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <Loader show={!classesProfessor} center={true} />
            {classesProfessor && classesProfessor.length !== 0 && (
              <>
                {classesProfessor.map((c) => (
                  <CCol md={4} key={c.id} className="d-flex my-2">
                    <CCard className="border-dark flex-grow-1">
                      <CCardHeader className="bg-dark text-white">
                        <CCardTitle className="fs-6">
                          {c.career?.name}
                        </CCardTitle>
                      </CCardHeader>
                      <CCardBody>
                        <p>
                          <b>Ciclo:</b> {c.cycle.abbreviation} -{" "}
                          {c.cycle.description}
                        </p>
                        <p>
                          <b>Curso:</b> {c.course.name?.toUpperCase()}
                        </p>
                      </CCardBody>
                      <CCardFooter className="text-end">
                        <CButton color="success" className="text-white">
                          Ver clase
                        </CButton>
                      </CCardFooter>
                    </CCard>
                  </CCol>
                ))}
              </>
            )}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default PClasses;
