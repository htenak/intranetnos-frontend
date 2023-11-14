import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CCardTitle,
  CCardFooter,
  CTooltip,
} from "@coreui/react";
import {
  faCalendarAlt,
  faQuestion,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
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
          <CCardTitle className="fs-4 m-0">Clases que enseñas</CCardTitle>
        </CCardHeader>
        <CCardBody className="pt-1">
          {/* POR HACER: agregar para filtrar por días */}
          <CRow>
            <Loader show={!classesProfessor} center={true} />
            {classesProfessor && classesProfessor.length !== 0 && (
              <>
                {classesProfessor.map((c) => (
                  <CCol md={6} lg={4} key={c.id} className="d-flex my-2">
                    <CCard className="flex-grow-1 overflow-hidden">
                      <div className="card-patron">
                        <div className="card-patron-success d-flex flex-column">
                          <CCardHeader
                            className="bg-patron-success"
                            style={{ height: 100, overflow: "hidden" }}
                          >
                            <CCardTitle
                              className="p-1 text-white"
                              style={{ fontSize: 18 }}
                            >
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
                              <p className="text-end m-0">
                                <CTooltip
                                  placement="left"
                                  content={
                                    c.status
                                      ? "Esta clase está activa"
                                      : "Esta clase está inactiva"
                                  }
                                  style={
                                    c.status
                                      ? {
                                          "--cui-tooltip-bg":
                                            "var(--cui-success)",
                                        }
                                      : {
                                          "--cui-tooltip-bg":
                                            "var(--cui-danger)",
                                        }
                                  }
                                >
                                  <span
                                    className={`${
                                      c.status ? "bg-success" : "bg-danger"
                                    } px-1 rounded`}
                                  >
                                    <FAIcon
                                      customClass="icon"
                                      icon={faQuestion}
                                    />
                                  </span>
                                </CTooltip>
                              </p>
                            </div>
                          </CCardBody>
                          <CCardFooter className="text-end">
                            <CButton
                              color="light"
                              style={{ marginRight: 10 }}
                              title="Ver horario"
                            >
                              <FAIcon customClass="icon" icon={faCalendarAlt} />{" "}
                              Horario
                            </CButton>
                            <CButton color="warning" title="Ver alumnos">
                              <FAIcon customClass="icon" icon={faUserFriends} />{" "}
                              Alumnos
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
