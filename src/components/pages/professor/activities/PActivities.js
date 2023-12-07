import { CCard, CCardBody, CCardHeader, CCardTitle } from "@coreui/react";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";

const PActivities = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader style={{ background: "#fff", padding: 13 }}>
          <CCardTitle className="fs-6 m-0 d-flex justify-content-between">
            Tus actividades <FAIcon icon={faWindowRestore} />
          </CCardTitle>
        </CCardHeader>
        <CCardBody className="pt-2"></CCardBody>
      </CCard>
    </>
  );
};
export default PActivities;
