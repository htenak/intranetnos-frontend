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
import { Avatar, Card, Divider, Spin, Tag } from "antd";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { intranetAvatarApi } from "src/api";
import { FAIcon } from "src/assets/icon/FAIcon";
import imgUser from "src/assets/images/user.png";
import Loader from "src/components/layout/loader/Loader";
import { PhotoModal } from "src/components/pages/customComponents";
import {
  getAllCareersProfessor,
  getAllColleaguesProfessor,
  getAllCyclesProfessor,
  getAllOtherClassesProfessor,
  getSchedulesByClass,
} from "src/store";
import { ViewScheduleModal } from "./modals";
import defaultClassImg from "src/assets/images/defaultClassImg.jpg";

const POtherClasses = () => {
  const { Meta } = Card;
  const dispatch = useDispatch();

  const { careersProfessor, cyclesProfessor, colleaguesProfessor } =
    useSelector((state) => state.academicProfessor);
  const { otherClassesProfessors, loadingOtherClassesP } = useSelector(
    (state) => state.classesProfessor
  );

  const [statusPhotoModal, setStatusPhotoModal] = useState(false);
  const [photoNameModal, setPhotoNameModal] = useState(null);
  const [userNameModal, setUserNameModal] = useState(null);
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

  const showPhotoModal = (photoName, userName) => {
    setPhotoNameModal(photoName);
    setUserNameModal(userName);
    setStatusPhotoModal(true);
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CCardTitle className="fs-5 m-0">Otras clases</CCardTitle>
        </CCardHeader>
        <CCardBody className="pt-2">
          <Divider>Filtros:</Divider>
          <CRow className="fs-14px-all">
            <CCol lg={5}>
              <CFormLabel className="mb-1">Por carreras:</CFormLabel>
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

          <Divider>Registros:</Divider>
          <Spin spinning={loadingOtherClassesP} className="mt-5">
            <CRow>
              <Loader show={!otherClassesProfessors} center={true} />
              {rowsData && rowsData.length !== 0 && (
                <>
                  {rowsData.map((c) => (
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
                            onClick={() => onClickSchedule(c.id)}
                            className="text-success"
                          >
                            <FAIcon customClass="icon" icon={faCalendarAlt} />{" "}
                            Ver Horario
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
                          avatar={
                            <Avatar
                              size="md"
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
                          }
                        ></Meta>
                      </Card>
                    </CCol>
                  ))}
                </>
              )}
            </CRow>
          </Spin>
        </CCardBody>
      </CCard>
      <PhotoModal
        photoName={photoNameModal}
        userName={userNameModal}
        statusM={statusPhotoModal}
        hideM={() => setStatusPhotoModal(false)}
      />
      <ViewScheduleModal
        statusModal={statusScheduleModal}
        hideModal={() => setStatusScheduleModal(false)}
      />
    </>
  );
};
export default POtherClasses;
