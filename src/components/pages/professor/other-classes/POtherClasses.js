import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
  CTooltip,
} from "@coreui/react";
import {
  faCalendarAlt,
  faQuestion,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { intranetAvatarApi } from "src/api";
import { FAIcon } from "src/assets/icon/FAIcon";
import imgUser from "src/assets/images/user.png";
import Loader from "src/components/layout/loader/Loader";
import { PhotoModal } from "src/components/pages/customComponents";
import { getAllOtherClassesProfessor, getSchedulesByClass } from "src/store";

const POtherClasses = () => {
  const dispatch = useDispatch();
  const { otherClassesProfessors } = useSelector(
    (state) => state.classesProfessor
  );

  const [statusPhotoModal, setStatusPhotoModal] = useState(false);
  const [photoNameModal, setPhotoNameModal] = useState(null);
  const [userNameModal, setUserNameModal] = useState(null);

  useEffect(() => {
    dispatch(getAllOtherClassesProfessor());
  }, []);

  const onClickSchedule = (classId) => {
    dispatch(getSchedulesByClass(classId));
  };

  const showPhotoModal = (photoName, userName) => {
    setPhotoNameModal(photoName);
    setUserNameModal(userName);
    setStatusPhotoModal(true);
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CCardTitle className="fs-4 m-0">Otras clases</CCardTitle>
        </CCardHeader>
        <CCardBody className="pt-1">
          {/* POR HACER: agregar para filtrar por ciclos y carreras */}
          <CRow>
            <Loader show={!otherClassesProfessors} center={true} />
            {otherClassesProfessors && otherClassesProfessors.length !== 0 && (
              <>
                {otherClassesProfessors.map((c) => (
                  <CCol md={6} lg={4} key={c.id} className="d-flex my-2">
                    <CCard className="flex-grow-1 overflow-hidden">
                      <div className="card-patron">
                        <div className="card-patron-primary d-flex flex-column">
                          <CCardHeader
                            className="bg-patron-primary"
                            style={{ height: 100, overflow: "hidden" }}
                          >
                            <CCardTitle
                              className="p-1 text-white"
                              style={{ fontSize: 18, height: "60%" }}
                            >
                              {c.career?.name}
                            </CCardTitle>
                            <CTooltip
                              placement="left"
                              content={`${c.professor.name} ${c.professor.lastName1} ${c.professor.lastName2}`}
                              style={{
                                "--cui-tooltip-bg": "var(--cui-dark)",
                              }}
                            >
                              <CAvatar
                                style={{ marginLeft: "72%" }}
                                className="position-absolute border border-dark bg-light"
                                size="xl"
                                onClick={() =>
                                  showPhotoModal(
                                    c.professor.filename,
                                    `${c.professor.name} ${c.professor.lastName1} ${c.professor.lastName2}`
                                  )
                                }
                                src={
                                  c.professor.filename
                                    ? `${intranetAvatarApi}/${c.professor.filename}`
                                    : imgUser
                                }
                              />
                            </CTooltip>
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
                              onClick={() => onClickSchedule(parseInt(c.id))}
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
      <PhotoModal
        photoName={photoNameModal}
        userName={userNameModal}
        statusM={statusPhotoModal}
        hideM={() => setStatusPhotoModal(false)}
      />
    </>
  );
};
export default POtherClasses;
