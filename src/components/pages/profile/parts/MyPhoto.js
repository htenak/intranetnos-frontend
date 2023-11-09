import React, { useEffect, useRef, useState } from "react";
import { CAlert, CButton, CCol, CRow } from "@coreui/react";
import { faSave, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { FAIcon } from "src/assets/icon/FAIcon";

import { useDispatch, useSelector } from "react-redux";
import { intranetAvatarApi } from "src/api";
import { uploadMyPhoto } from "src/store";

import imgUser from "src/assets/images/user.png";

import { ConfirmDeletePhoto } from "../modals";

export const MyPhoto = () => {
  const dispatch = useDispatch();
  const { filename } = useSelector((state) => state.auth?.user);

  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  const [statusModal, setStatusModal] = useState(false);

  /* captura subida de imagen , hace
   * preview y selecciona imagen a subir
   */
  const onFileInputChange = async (e) => {
    const { files } = e.target;
    if (files[0]) {
      const resizedImg = await resizeImage(files[0], 300);
      setFilePreview(URL.createObjectURL(resizedImg));
      setPreview(true);

      const formData = new FormData();
      formData.append("file", resizedImg);
      setFileUpload(formData);
    }
  };

  // redimensiona imagen (solo alto maximo)
  const resizeImage = async (file, maxHeight) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    return new Promise((resolve) => {
      image.onload = () => {
        const width = image.width;
        const height = image.height;
        let newWidth, newHeight;

        if (height > maxHeight) {
          newHeight = maxHeight;
          newWidth = (maxHeight / height) * width;
        } else {
          newHeight = height;
          newWidth = width;
        }

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name));
        }, file.type);
      };
    });
  };

  // sube foto de perfil
  const uploadPhoto = () => {
    if (!filePreview) {
      return toast.error("No has seleccionado alguna foto");
    }
    dispatch(uploadMyPhoto(fileUpload));
    deletePreview();
  };

  // elimina imagen subida y preview
  const deletePreview = () => {
    setPreview(null);
    setFilePreview(null);
  };

  // abre pestaña de la foto
  const goImageURL = () => {
    if (!filename && !preview) {
      window.open(imgUser, "_blank");
    } else if (filename && !preview) {
      window.open(`${intranetAvatarApi}/${filename}`, "_blank");
    } else {
      window.open(filePreview, "_blank");
    }
  };

  return (
    <>
      <CCol lg={4} className="d-flex flex-column justify-content-center">
        <CRow className="d-flex justify-content-center">
          <CCol
            xs={12}
            style={{
              maxHeight: 220,
              width: "auto",
              maxWidth: "90%",
              overflow: "hidden",
            }}
            className=" d-flex justify-content-center align-items-center"
          >
            <img
              style={{
                maxHeight: "100%",
                width: "auto",
                maxWidth: "100%",
                borderRadius: 3,
                cursor: "pointer",
              }}
              alt="Foto de perfil - NOS"
              src={
                (filename && !preview && `${intranetAvatarApi}/${filename}`) ||
                (preview && filePreview) ||
                (!filename && !preview && imgUser)
              }
              onClick={goImageURL}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol className="text-center">
            <>
              <p>
                <i>.jpg, .jpeg, .png o .webp</i>
              </p>
              <CAlert color="success" visible={preview}>
                Previsualización
              </CAlert>
            </>
            <>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={onFileInputChange}
                name="file"
                accept="image/png, .jpeg, .jpg, .webp"
              />
              <CButton
                color="danger"
                title="Eliminar foto de perfil"
                className="text-white"
                onClick={
                  !preview && filename
                    ? () => setStatusModal(true)
                    : deletePreview
                }
              >
                <FAIcon customClass="icon" icon={faTrash} />
              </CButton>
              <CButton
                color="primary"
                title="Subir foto de perfil"
                style={{ marginLeft: 10 }}
                onClick={() => fileInputRef.current.click()}
              >
                <FAIcon customClass="icon" icon={faUpload} />
              </CButton>
              {preview && filePreview ? (
                <CButton
                  color="success"
                  title="Guardar foto de perfil"
                  style={{ marginLeft: 10, color: "#fff" }}
                  onClick={uploadPhoto}
                >
                  <FAIcon customClass="icon" icon={faSave} />
                </CButton>
              ) : (
                <></>
              )}
            </>
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
