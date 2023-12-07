import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CFormLabel,
  CFormSelect,
  CRow,
} from "@coreui/react";
import { Avatar, Card, Image, Spin, Tag } from "antd";
import { faCalendarAlt, faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { intranetAvatarApi, intranetClassPhotoApi } from "src/api";
import { FAIcon } from "src/assets/icon/FAIcon";
import Loader from "src/components/layout/loader/Loader";
import { friendlyDateFormat } from "src/components/helpers";
import {
  getAllCareersProfessor,
  getAllColleaguesProfessor,
  getAllCyclesProfessor,
  getAllOtherClassesProfessor,
  getSchedulesByClass,
} from "src/store";
import { ViewScheduleModal } from "../../modals";

import imgUser from "src/assets/images/user.png";
import defaultClassImg from "src/assets/images/defaultClassImg.jpg";

export const OtherClassesProfessor = () => {
  const { Meta } = Card;
  const dispatch = useDispatch();

  const { careersProfessor, cyclesProfessor, colleaguesProfessor } =
    useSelector((state) => state.academicProfessor);
  const { otherClassesProfessors, loadingOtherClassesP } = useSelector(
    (state) => state.classesProfessor
  );

  const [statusScheduleModal, setStatusScheduleModal] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const [careerId, setCareerId] = useState(0);
  const [cycleId, setCycleId] = useState(0);
  const [professorId, setProfessorId] = useState(0);

  useEffect(() => {
    dispatch(getAllCareersProfessor());
    dispatch(getAllCyclesProfessor());
    dispatch(getAllColleaguesProfessor());
    dispatch(getAllOtherClassesProfessor());
  }, []);

  // asigno registros a un estado local y filtros
  useEffect(() => {
    if (otherClassesProfessors) {
      if (otherClassesProfessors.length !== 0) {
        let data = [...otherClassesProfessors];
        setRowsData(data);
      } else {
        setRowsData([]);
      }
    }
  }, [otherClassesProfessors]);

  useEffect(() => {
    dispatch(getAllOtherClassesProfessor([careerId, cycleId, professorId]));
  }, [careerId, cycleId, professorId]);

  // input change para los filtros
  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    if (name === "career") {
      setCareerId(value);
    }
    if (name === "cycle") {
      setCycleId(value);
    }
    if (name === "professor") {
      setProfessorId(value);
    }
  };

  const onClickSchedule = (classId) => {
    dispatch(getSchedulesByClass(classId));
    setStatusScheduleModal(true);
  };

  return (
    <>
      <CCard className="mb-4" style={{ borderTop: 0 }}>
        <CCardHeader style={{ background: "#fff", padding: 13 }}>
          <CCardTitle className="fs-6 m-0 d-flex justify-content-between">
            Otras clases <FAIcon icon={faChalkboard} />
          </CCardTitle>
        </CCardHeader>
        <CCardBody className="pt-2">
          <CRow className="fs-14px-all">
            <CCol lg={5}>
              <CFormLabel className="mb-1">Por carrera:</CFormLabel>
              <Spin spinning={!careersProfessor}>
                <CFormSelect
                  value={careerId || 0}
                  onChange={handleChangeFilter}
                  name="career"
                >
                  <option value={0}>Todos</option>
                  {careersProfessor?.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </CFormSelect>
              </Spin>
            </CCol>
            <CCol lg={2} className="mt-2 mt-lg-0">
              <CFormLabel className="mb-1">Por ciclo:</CFormLabel>
              <Spin spinning={!cyclesProfessor}>
                <CFormSelect
                  value={cycleId || 0}
                  onChange={handleChangeFilter}
                  name="cycle"
                >
                  <option value={0}>Todos</option>
                  {cyclesProfessor?.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.abbreviation} ciclo
                    </option>
                  ))}
                </CFormSelect>
              </Spin>
            </CCol>
            <CCol lg={5} className="mt-2 mt-lg-0">
              <CFormLabel className="mb-1">Por profesor/a:</CFormLabel>
              <Spin spinning={!colleaguesProfessor}>
                <CFormSelect
                  value={professorId || 0}
                  onChange={handleChangeFilter}
                  name="professor"
                >
                  <option value={0}>Todos</option>
                  {colleaguesProfessor?.map((e) => (
                    <option key={e.id} value={e.id}>
                      {`${e.name} ${e.lastName1} ${e.lastName2}`} ciclo
                    </option>
                  ))}
                </CFormSelect>
              </Spin>
            </CCol>
          </CRow>
          <Spin spinning={loadingOtherClassesP} className="mt-5">
            <CRow className="mt-1">
              <Loader show={!otherClassesProfessors} center={true} />
              {rowsData && rowsData.length !== 0 && (
                <>
                  {rowsData.map((c) => (
                    <CCol xs={12} sm={6} md={4} key={c.id} className="my-2">
                      <Card
                        cover={
                          <img
                            alt="Imagen de la clase"
                            src={
                              !c.filename
                                ? defaultClassImg
                                : `${intranetClassPhotoApi}/${c.filename}`
                            }
                            style={{ objectFit: "cover", height: 170 }}
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
                            onClick={() => onClickSchedule(c.id)}
                            className="text-dark"
                          >
                            <FAIcon customClass="icon" icon={faCalendarAlt} />{" "}
                            Horario
                          </span>,
                        ]}
                      >
                        <Meta
                          description={
                            <div
                              style={{
                                height: 180,
                                overflow: "auto",
                              }}
                            >
                              <b className="text-dark">{c.career.name}</b>{" "}
                              <span className="d-block">{c.denomination}</span>
                              <span className="d-block">
                                <strong>Fecha:</strong>{" "}
                                {friendlyDateFormat(c.createdAt)}
                              </span>
                            </div>
                          }
                          avatar={
                            <Avatar
                              // size="large"
                              src={
                                <Image
                                  src={
                                    c.professor.filename
                                      ? `${intranetAvatarApi}/${c.professor.filename}`
                                      : imgUser
                                  }
                                />
                              }
                            />
                          }
                        />
                      </Card>
                    </CCol>
                  ))}
                </>
              )}
            </CRow>
          </Spin>
        </CCardBody>
      </CCard>

      <ViewScheduleModal
        statusModal={statusScheduleModal}
        hideModal={() => setStatusScheduleModal(false)}
      />
    </>
  );
};
