import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import { intranetAvatarApi } from "src/api";
import imgUser from "src/assets/images/user.png";

export const PhotoModal = ({
  statusM,
  hideM,
  sizeM = "sm",
  photoName,
  userName,
}) => {
  return (
    <CModal visible={statusM} onClose={hideM} alignment="center" size={sizeM}>
      <CModalHeader>{userName}</CModalHeader>
      <CModalBody>
        <img
          alt="Foto del perfil"
          src={
            photoName !== null ? `${intranetAvatarApi}/${photoName}` : imgUser
          }
          className="w-100 rounded"
        />
      </CModalBody>
    </CModal>
  );
};
