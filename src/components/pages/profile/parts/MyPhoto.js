import React, { useEffect, useRef, useState } from "react";
import { CButton, CCol, CRow } from "@coreui/react";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

import { FAIcon } from "src/assets/icon/FAIcon";

import { useDispatch, useSelector } from "react-redux";
import { intranetAvatarApi } from "src/api";
import {} from "src/store";

import imgUser from "../../../../assets/images/user.png";

import { ConfirmDeletePhoto } from "../modals";

export const MyPhoto = () => {
  const dispatch = useDispatch();
  const { filename } = useSelector((state) => state.auth?.user);

  const fileInputRef = useRef();
  const [myPhoto, setMyPhoto] = useState(imgUser);
  const [statusModal, setStatusModal] = useState(false);

  // muestra la foto de perfil
  useEffect(() => {
    if (filename !== null) {
      setMyPhoto(`${intranetAvatarApi}/${filename}`);
    } else {
      setMyPhoto(imgUser);
    }
  }, [filename]);

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    console.log(target);
  };
  return (
    <>
      <CCol className="d-flex flex-column justify-content-center">
        <CRow className="mt-2">
          <CCol className="d-flex justify-content-center">
            <div
              style={{
                width: "100%",
                maxWidth: "310px",
                height: "230px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={myPhoto}
                className="img-fluid img-thumbnail"
                alt="Mi foto del perfil"
              />
            </div>
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol className="text-center">
            {myPhoto !== imgUser ? (
              <CButton
                color="danger"
                title="Eliminar foto de perfil"
                className="text-white"
                onClick={() => setStatusModal(true)}
              >
                <FAIcon customClass="icon" icon={faTrash} />
              </CButton>
            ) : (
              <></>
            )}
            {myPhoto === imgUser ? (
              <>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={onFileInputChange}
                />
                <CButton
                  style={{ marginLeft: "10px" }}
                  color="primary"
                  title="Subir foto de perfil"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FAIcon customClass="icon" icon={faUpload} />
                </CButton>
              </>
            ) : (
              <></>
            )}
          </CCol>
        </CRow>
      </CCol>
      <ConfirmDeletePhoto
        statusModal={statusModal}
        hideModal={setStatusModal}
      />
    </>
  );
};
