import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCardTitle,
} from "@coreui/react";
import { Card, Tag, Tooltip } from "antd";
import {
  faCalendarAlt,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FAIcon } from "src/assets/icon/FAIcon";
import Loader from "src/components/layout/loader/Loader";
import { getAllClassesProfessor } from "src/store";

import defaultClassImg from "src/assets/images/defaultClassImg.jpg";

const PClasses = () => {
  const Meta = Card.Meta;
  const dispatch = useDispatch();
  const { classesProfessor } = useSelector((state) => state.classesProfessor);

  useEffect(() => {
    dispatch(getAllClassesProfessor());
  }, []);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CCardTitle className="fs-5 m-0">Clases que enseñas</CCardTitle>
        </CCardHeader>
        <CCardBody className="pt-2">
          {/* POR HACER: agregar para filtrar por días */}
          <CRow>
            <Loader show={!classesProfessor} center={true} />
            {classesProfessor && classesProfessor.length !== 0 && (
              <>
                {classesProfessor.map((c) => (
                  <CCol
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={c.id}
                    className="my-2"
                  >
                    <Card
                      cover={
                        <img alt="Imagen de clase" src={defaultClassImg} />
                      }
                      actions={[
                        <span>
                          <Tag
                            style={{ cursor: "not-allowed" }}
                            color={c.status ? "#87d068" : "#cf3c3c"}
                          >
                            {c.status ? "Clase activa" : "Clase inactiva"}
                          </Tag>
                        </span>,
                        <span
                          // onClick={() => onClickSchedule(c.id)}
                          className="text-success"
                        >
                          <FAIcon customClass="icon" icon={faCalendarAlt} /> Ver
                          Horario
                        </span>,
                      ]}
                    >
                      <Meta
                        description={
                          <div style={{ height: 140, overflow: "auto" }}>
                            <b className="text-dark">{c.career.name}</b>{" "}
                            <span className="d-block">{c.denomination}</span>
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
    </>
  );
};
export default PClasses;
