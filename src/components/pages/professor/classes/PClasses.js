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
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
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
          <CCardTitle className="fs-4">Clases que enseñas</CCardTitle>
        </CCardHeader>
        <CCardBody className="pt-1">
          <CRow>
            <Loader show={!classesProfessor} center={true} />
            {classesProfessor && classesProfessor.length !== 0 && (
              <>
                {classesProfessor.map((c) => (
                  <CCol md={6} lg={4} key={c.id} className="d-flex my-2">
                    <CCard className="flex-grow-1 overflow-hidden">
                      <div className="card-patron">
                        <div className="card-patron-success">
                          <CCardHeader className="bg-greener">
                            <CCardTitle className="fs-5 text-white">
                              {c.career?.name}
                            </CCardTitle>
                          </CCardHeader>
                          <CCardBody className="text-white">
                            <div>
                              <p>
                                <span className="fw-bold">Ciclo: </span>
                                {c.cycle.abbreviation}
                              </p>
                              <p>
                                <span className="fw-bold">Curso: </span>
                                {c.course.name}
                              </p>
                            </div>
                          </CCardBody>
                          <CCardFooter className="text-end">
                            <CButton color="warning">
                              Estudiantes{" "}
                              <FAIcon customClass="icon" icon={faUserFriends} />
                            </CButton>
                          </CCardFooter>
                        </div>
                      </div>
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
