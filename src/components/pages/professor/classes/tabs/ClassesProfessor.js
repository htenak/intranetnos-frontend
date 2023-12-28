import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCardTitle,
} from "@coreui/react";
import { Button, Card, Image } from "antd";
import { faChalkboardTeacher, faCog } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllClassesProfessor } from "src/store";
import { intranetClassPhotoApi } from "src/api";
import { FAIcon } from "src/assets/icon/FAIcon";
import { ConfigClassProfessorModal, ViewScheduleModal } from "../../modals";
import Loader from "src/components/layout/loader/Loader";
import defaultClassImg from "src/assets/images/defaultClassImg.jpg";
import { friendlyDateFormat, messageHandler } from "src/components/helpers";

export const ClassesProfessor = () => {
  const Meta = Card.Meta;
  const navigate = useNavigate();
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
    localStorage.removeItem("insideClassProfesor");
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

  const onClickEnterClass = (classs) => {
    localStorage.setItem("insideClassProfesor", JSON.stringify(classs));
    navigate("/professor/classes/one-class");
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
                        <Button
                          type="primary"
                          onClick={() => onClickEnterClass(c)}
                          style={{
                            width: "88%",
                            textAlign: "center",
                            background: "green",
                          }}
                        >
                          Entrar
                        </Button>,
                      ]}
                    >
                      <Meta
                        description={
                          <div style={{ height: 150, overflow: "auto" }}>
                            <b className="text-dark">{c.career.name}</b>{" "}
                            <span className="d-block">{c.denomination}</span>
                            <span className="d-block">
                              <strong>Fecha:</strong>{" "}
                              {friendlyDateFormat(c.createdAt)}
                            </span>
                            <span className="pt-4 d-flex justify-content-between">
                              <span
                                onClick={() => onClickConfigClass(c, true)}
                                style={{ cursor: "pointer" }}
                              >
                                <FAIcon icon={faCog} customClass="icon" />
                              </span>
                              <span
                                style={
                                  c.status
                                    ? { color: "green" }
                                    : { color: "#cf3c3c" }
                                }
                              >
                                {c.status ? "Clase activa" : "Clase inactiva"}
                              </span>
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
