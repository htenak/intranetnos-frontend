import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from "@coreui/react";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Image, List, Spin } from "antd";
import { FAIcon } from "src/assets/icon/FAIcon";
import Loader from "src/components/layout/loader/Loader";
import { searcher } from "src/components/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllCareersProfessor,
  getAllCyclesProfessor,
  getAllPupilsProfessor,
} from "src/store";
import { intranetAvatarApi } from "src/api";

import imgUser from "src/assets/images/user.png";
import CheckableTag from "antd/es/tag/CheckableTag";

const PPupils = () => {
  const dispatch = useDispatch();
  const { pupilsProfessor, loadingPupilsProfessor } = useSelector(
    (state) => state.pupilsProfessor
  );
  const { careersProfessor, cyclesProfessor } = useSelector(
    (state) => state.academicProfessor
  );

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [careerId, setCareerId] = useState(0);
  const [cycleId, setCycleId] = useState(0);

  useEffect(() => {
    dispatch(getAllCareersProfessor());
    dispatch(getAllCyclesProfessor());
    dispatch(getAllPupilsProfessor());
  }, []);

  useEffect(() => {
    dispatch(getAllPupilsProfessor([careerId, cycleId]));
  }, [careerId, cycleId]);

  useEffect(() => {
    if (pupilsProfessor && pupilsProfessor.length !== 0) {
      const data = [...pupilsProfessor];
      setRows(data);
    } else {
      setRows([]);
    }
  }, [pupilsProfessor]);

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    if (name === "career") {
      setCareerId(value);
    }
    if (name === "cycle") {
      setCycleId(value);
    }
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader style={{ background: "#fff", padding: 13 }}>
          <CCardTitle className="fs-6 m-0 d-flex justify-content-between">
            Todos tus alumnos/as <FAIcon icon={faUserGraduate} />
          </CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CRow className="fs-14px-all">
            <CCol lg={5}>
              <CFormLabel className="mb-1">Por carrera:</CFormLabel>
              <Spin spinning={!careersProfessor}>
                <CFormSelect
                  name="career"
                  value={careerId || 0}
                  onChange={handleChangeFilter}
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
                  name="cycle"
                  value={cycleId || 0}
                  onChange={handleChangeFilter}
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
              <CFormLabel className="mb-1">
                Ingrese criterio de búsqueda
              </CFormLabel>
              <CFormInput
                type="search"
                placeholder="Buscar"
                onChange={(e) => setSearch(e.target.value)}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <div
                style={{
                  height: 420,
                  width: "100%",
                  overflowY: "auto",
                }}
              >
                <Loader show={!pupilsProfessor} center={true} />
                <Spin spinning={loadingPupilsProfessor}>
                  <List
                    style={{
                      height: 410,
                      overflow: "auto",
                      marginTop: 10,
                      padding: "0 16px",
                      border: "1px solid #eee",
                    }}
                    itemLayout="horizontal"
                    dataSource={searcher(rows, search) || []}
                    locale={{
                      emptyText: "Ningún registro encontrado",
                    }}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <CheckableTag className="bg-primary text-white">
                            Ver perfil
                          </CheckableTag>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              size="large"
                              src={
                                <Image
                                  src={
                                    item.filename
                                      ? `${intranetAvatarApi}/${item.filename}`
                                      : imgUser
                                  }
                                />
                              }
                            />
                          }
                          title={`${item.name} ${item.lastName1} ${item.lastName2} (${item.nickname})`}
                          description={
                            <div style={{ fontSize: 12 }}>
                              <b style={{ fontSize: 12 }}>Correo: </b>
                              {!item.email ? "---" : item.email}
                              <br />
                              <b style={{ fontSize: 12 }}>Celular: </b>
                              {item.phone}
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Spin>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default PPupils;
