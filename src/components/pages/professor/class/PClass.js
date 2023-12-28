import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
import { Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FAIcon } from "src/assets/icon/FAIcon";
import {
  faArrowLeft,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import { ActivitiesTab, PupilsTab } from "./tabs";
import { messageHandler } from "src/components/helpers";

const PClass = () => {
  const navigate = useNavigate();
  const { statusDataActivity, activitySuccessMessage, activityErrorMessage } =
    useSelector((state) => state.activitiesProfessor);

  // mensajes de las peticiones
  useEffect(() => {
    if (statusDataActivity !== null) {
      messageHandler(
        activityErrorMessage,
        activitySuccessMessage,
        statusDataActivity
      );
    } else {
      messageHandler(activityErrorMessage);
    }
  }, [statusDataActivity, activityErrorMessage]);

  const [classProfesor] = useState(
    JSON.parse(localStorage.getItem("insideClassProfesor"))
  );

  // valida hay datos de una clase seleccionada sino redirecciona las clases
  useEffect(() => {
    if (!classProfesor) navigate("/professor/classes");
  }, []);

  const itemsTab = [
    {
      key: 1,
      label: "Actividades",
      children: <ActivitiesTab propClass={classProfesor} />,
    },
    {
      key: 2,
      label: "Alumnos",
      children: <PupilsTab />,
    },
  ];

  return (
    <>
      <CCard>
        <CCardHeader
          style={{ background: "#fff", padding: "18px 5%" }}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <Link to="/professor/classes">
              <FAIcon icon={faArrowLeft} /> Volver
            </Link>
            <div className="mt-3">
              <CCardTitle className="fs-6 m-0">
                {classProfesor?.career?.name}
              </CCardTitle>
              <span style={{ fontSize: 15 }}>
                {`${classProfesor?.cycle?.abbreviation} ciclo • ${classProfesor?.course?.name}`}
              </span>
            </div>
          </div>
          <div>
            <FAIcon icon={faChalkboardTeacher} />
          </div>
        </CCardHeader>
        <CCardBody style={{ padding: "15px 8%" }}>
          <CRow className="pb-4">
            <CCol>
              <Tabs items={itemsTab} defaultActiveKey={1} />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default PClass;
