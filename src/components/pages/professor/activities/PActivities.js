import { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
import { faBoxes, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import { ActivitiesRecords, AddActivity, AddTypeActivity } from "./parts";
import { messageHandler } from "src/components/helpers";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities, getAllActivityTypes } from "src/store";

const PActivities = () => {
  const dispatch = useDispatch();
  const {
    statusDataActivityType,
    activityTypeSuccessMessage,
    activityTypeErrorMessage,
    statusDataActivity,
    activitySuccessMessage,
    activityErrorMessage,
  } = useSelector((state) => state.activitiesProfessor);

  const [valuesToEdit, setValuesToEdit] = useState(null);

  useEffect(() => {
    dispatch(getAllActivityTypes());
    dispatch(getAllActivities());
  }, []);

  // mensajes de las peticiones
  useEffect(() => {
    if (statusDataActivityType !== null) {
      messageHandler(
        activityTypeErrorMessage,
        activityTypeSuccessMessage,
        statusDataActivityType
      );
    } else {
      messageHandler(activityTypeErrorMessage);
    }
  }, [statusDataActivityType, activityTypeErrorMessage]);

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

  // obtiene actividad a editar y se la pasa por prop al componente respectivo
  const getAndSetActivityToEdit = (values) => {
    setValuesToEdit(values);
  };

  return (
    <>
      <CCard className="mb-2">
        <CCardHeader style={{ background: "#fff", padding: 13 }}>
          <CCardTitle className="fs-6 m-0 d-flex justify-content-between">
            Gestionar actividades <FAIcon icon={faWindowRestore} />
          </CCardTitle>
        </CCardHeader>
        <CCardBody className="pt-2">
          <CRow>
            <CCol md={6} lg={5}>
              <AddTypeActivity />
            </CCol>
            <CCol md={6} lg={7} className="mt-2 mt-md-0">
              <AddActivity
                getAndSetActivityToEdit={getAndSetActivityToEdit}
                valuesToEdit={valuesToEdit}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader style={{ background: "#fff", padding: 13 }}>
          <CCardTitle className="fs-6 m-0 d-flex justify-content-between">
            Todas tus actividades <FAIcon icon={faBoxes} />
          </CCardTitle>
        </CCardHeader>
        <CCardBody className="pt-2">
          <CRow>
            <CCol className="mt-1">
              <ActivitiesRecords
                getAndSetActivityToEdit={getAndSetActivityToEdit}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default PActivities;
