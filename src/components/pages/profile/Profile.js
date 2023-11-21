import React from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { MyData, Password } from "./parts";

const Profile = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-5 mb-3">Mi perfil</h1>
          <CRow>
            <CCol xs>
              <MyData />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol xs>
              <Password />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Profile;
