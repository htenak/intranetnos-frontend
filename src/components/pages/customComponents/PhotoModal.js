import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import { intranetAvatarApi } from "src/api";
import imgUser from "src/assets/images/user.png";

export const PhotoModal = ({ statusM, hideM, photoName, userName }) => {
  return (
    <CModal visible={statusM} onClose={hideM} alignment="center" size="sm">
      <CModalHeader style={{ background: "#111", color: "#fff" }}>
        {userName}
      </CModalHeader>
      <CModalBody style={{ background: "#111" }}>
        <img
          alt="Foto del perfil"
          src={
            photoName !== null ? `${intranetAvatarApi}/${photoName}` : imgUser
          }
          className="w-100"
        />
      </CModalBody>
    </CModal>
  );
};
