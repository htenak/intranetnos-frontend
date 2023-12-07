import { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCardTitle,
} from "@coreui/react";
import { Card, Image, Tag } from "antd";
import {
  faCalendarAlt,
  faChalkboardTeacher,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllClassesProfessor, getSchedulesByClass } from "src/store";
import { intranetClassPhotoApi } from "src/api";
import { FAIcon } from "src/assets/icon/FAIcon";
import { ConfigClassProfessorModal, ViewScheduleModal } from "../../modals";
import Loader from "src/components/layout/loader/Loader";
import defaultClassImg from "src/assets/images/defaultClassImg.jpg";
import { friendlyDateFormat, messageHandler } from "src/components/helpers";

export const ClassesProfessor = () => {
  const Meta = Card.Meta;
  const dispatch = useDispatch();
  const {
    classesProfessor,
    statusPhotoClass,
    classProfessorErrorMessage,
    classProfessorSuccessMessage,
  } = useSelector((state) => state.classesProfessor);

  const [dataClass, setDataClass] = useState(0);
  const [statusConfigClassModal, setStatusConfigClassModal] = useState(false);
  const [statusScheduleModal, setStatusScheduleModal] = useState(false);

  useEffect(() => {
    dispatch(getAllClassesProfessor());
  }, []);

  // mensajes de las peticiones
  useEffect(() => {
    if (statusPhotoClass !== null) {
      messageHandler(
        classProfessorErrorMessage,
        classProfessorSuccessMessage,
        statusPhotoClass
      );
    } else {
      messageHandler(classProfessorErrorMessage);
    }
  }, [classProfessorErrorMessage, statusPhotoClass]);

  const onClickConfigClass = (dataClass = {}, status = false) => {
    setDataClass(dataClass);
    setStatusConfigClassModal(status);
  };

  const onClickSchedule = (dataClass) => {
    dispatch(getSchedulesByClass(dataClass));
    setStatusScheduleModal(true);
  };

  return (
    <>
      <CCard className="mb-4" style={{ borderTop: 0 }}>
        <CCardHeader style={{ background: "#fff", padding: 13 }}>
          <CCardTitle className="fs-6 m-0 d-flex justify-content-between">
            Clases que enseñas <FAIcon icon={faChalkboardTeacher} />
          </CCardTitle>
        </CCardHeader>
        <CCardBody className="pt-2">
          {/* POR HACER: agregar para filtrar por días */}
          <CRow>
            <Loader show={!classesProfessor} center={true} />
            {classesProfessor && classesProfessor.length !== 0 && (
              <>
                {classesProfessor.map((c) => (
                  <CCol xs={12} sm={6} md={4} key={c.id} className="my-2">
                    <Card
                      cover={
                        <Image
                          alt="Imagen de la clase"
                          src={
                            !c.filename
                              ? defaultClassImg
                              : `${intranetClassPhotoApi}/${c.filename}`
                          }
                          style={{
                            objectFit: "cover",
                            height: 170,
                          }}
                        />
                      }
                      actions={[
                        <Tag
                          style={{ cursor: "not-allowed" }}
                          color={c.status ? "#87d068" : "#cf3c3c"}
                        >
                          {c.status ? "Clase activa" : "Clase inactiva"}
                        </Tag>,
                        <span
                          className="text-dark"
                          onClick={() => onClickConfigClass(c, true)}
                        >
                          <FAIcon customClass="icon" icon={faCog} />
                        </span>,
                        <span
                          className="text-dark"
                          onClick={() => onClickSchedule(c.id)}
                        >
                          <FAIcon customClass="icon" icon={faCalendarAlt} />{" "}
                          Horario
                        </span>,
                      ]}
                    >
                      <Meta
                        description={
                          <div style={{ height: 130, overflow: "auto" }}>
                            <b className="text-dark">{c.career.name}</b>{" "}
                            <span className="d-block">{c.denomination}</span>
                            <span className="d-block">
                              <strong>Fecha:</strong>{" "}
                              {friendlyDateFormat(c.createdAt)}
                            </span>
                          </div>
                        }
                      />
                    </Card>
                  </CCol>
                ))}
              </>
            )}
          </CRow>
        </CCardBody>
      </CCard>
      <ViewScheduleModal
        statusModal={statusScheduleModal}
        hideModal={() => setStatusScheduleModal(false)}
      />
      <ConfigClassProfessorModal
        dataClass={dataClass}
        statusModal={statusConfigClassModal}
        hideModal={onClickConfigClass}
      />
    </>
  );
};
