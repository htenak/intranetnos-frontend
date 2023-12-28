import { useEffect, useRef, useState } from "react";
import {
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import {
  faArrowLeft,
  faCamera,
  faCog,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Popconfirm, Tag, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import Input from "antd/es/input/Input";
import { FAIcon } from "src/assets/icon/FAIcon";
import { resizeImageToUpload } from "src/components/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePhotoClassProfessor,
  uploadPhotoClassProfessor,
} from "src/store";
import { intranetClassPhotoApi } from "src/api";
import defaultClassImg from "src/assets/images/defaultClassImg.jpg";

export const ConfigClassProfessorModal = ({
  statusModal,
  hideModal,
  dataClass,
}) => {
  const dispatch = useDispatch();
  const { statusPhotoClass } = useSelector((state) => state.classesProfessor);

  const fileRef = useRef(null);
  const [statusChangeCoverPhoto, setStatusChangeCoverPhoto] = useState(false);
  const [statusReportClass, setStatusReportClass] = useState(false);
  const [classSelected, setClassSelected] = useState({});

  useEffect(() => {
    if (statusModal) {
      if (Object.keys(dataClass).length !== 0) {
        setClassSelected(dataClass);
      } else {
        setClassSelected({});
      }
    }
  }, [statusModal]);

  useEffect(() => {
    if (statusPhotoClass === "UPDATED") {
      hideThisModal();
    }
    if (statusPhotoClass === "DELETED") {
      setClassSelected({ ...classSelected, filename: null });
    }
  }, [statusPhotoClass]);

  // muestra seccion para subir/cambiar foto
  const onClickChangeCoveFoto = () => {
    setStatusReportClass(false);
    setStatusChangeCoverPhoto(true);
  };

  // muestra seccion para reportar clase
  const onClickReportClass = () => {
    setStatusChangeCoverPhoto(false);
    setStatusReportClass(true);
  };

  // cerrar opciones
  const onClickCloseOptions = () => {
    setStatusChangeCoverPhoto(false);
    setStatusReportClass(false);
  };

  // captura imagen subida
  const onFileChange = async (e) => {
    const { files } = e.target;
    if (files[0]) {
      const resizedImg = await resizeImageToUpload(files[0], 200);
      const formData = new FormData();
      formData.append("file", resizedImg);
      dispatch(uploadPhotoClassProfessor(classSelected.id, formData));
    }
  };

  // elimina foto de la clase
  const onDeletePhotoClass = () => {
    dispatch(deletePhotoClassProfessor(classSelected.id));
  };

  // componente del modal para ir hacia atras
  const GoBack = () => {
    return (
      <>
        <Tag
          onClick={onClickCloseOptions}
          style={{ cursor: "pointer" }}
          className="mb-3"
        >
          <FAIcon icon={faArrowLeft} /> Regresar
        </Tag>
      </>
    );
  };

  // cierra el modal y establece valores iniciales
  const hideThisModal = () => {
    setStatusChangeCoverPhoto(false);
    setStatusReportClass(false);
    hideModal();
  };

  return (
    <CModal
      visible={statusModal}
      onClose={hideThisModal}
      alignment="center"
      backdrop="static"
    >
      <CModalHeader>
        <CModalTitle className="fs-6">
          {!statusChangeCoverPhoto && !statusReportClass && (
            <>
              <FAIcon icon={faCog} /> Configuración de la clase
            </>
          )}
          {statusChangeCoverPhoto && (
            <>
              <FAIcon icon={faCamera} /> Cambiar foto de portada
            </>
          )}
          {statusReportClass && (
            <>
              <FAIcon icon={faWarning} /> Reportar error en esta clase
            </>
          )}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        {!statusChangeCoverPhoto && !statusReportClass && (
          <div className="d-flex justify-content-around flex-wrap">
            <Tag
              style={{ fontSize: 14, padding: "5px 20px", cursor: "pointer" }}
              onClick={onClickChangeCoveFoto}
            >
              <FAIcon icon={faCamera} /> Cambiar portada
            </Tag>
            <Tag
              style={{ fontSize: 14, padding: "5px 20px", cursor: "pointer" }}
              onClick={onClickReportClass}
            >
              <FAIcon icon={faWarning} /> Reportar error
            </Tag>
          </div>
        )}
        {statusChangeCoverPhoto && (
          <>
            <GoBack />
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileRef}
              onChange={onFileChange}
              accept="image/png, .jpeg, .jpg, .webp"
              name="filename"
            />
            <div className="text-center">
              <img
                width="100%"
                src={
                  !classSelected?.filename
                    ? defaultClassImg
                    : `${intranetClassPhotoApi}/${classSelected.filename}`
                }
              />
            </div>
            <div className="text-center mt-1">
              <i>.jpg, .jpeg, .png o .webp</i>
            </div>
            <div className="mt-3 text-center">
              {!classSelected.filename ? (
                <Button type="primary" onClick={() => fileRef.current.click()}>
                  + subir
                </Button>
              ) : (
                <Popconfirm
                  title="¿Desea continuar?"
                  cancelText="Cancelar"
                  okText="Sí"
                  onConfirm={onDeletePhotoClass}
                >
                  <Button type="primary" className="bg-danger">
                    Eliminar
                  </Button>
                </Popconfirm>
              )}
            </div>
          </>
        )}
        {statusReportClass && (
          <>
            <GoBack />

            <CForm>
              <CRow>
                <Col className="">
                  Clase
                  <Input
                    disabled
                    value={classSelected?.denomination}
                    className="text-dark"
                  />
                </Col>
                <Col className="mt-1">
                  Asunto
                  <Input placeholder="Asunto del problema" />
                </Col>
                <Col className="mt-1">
                  Describe el error
                  <TextArea
                    rows={5}
                    placeholder="Describe el problema con esta clase"
                  />
                </Col>
                <Col className="mt-2">
                  <Button type="primary" shape="round">
                    Enviar a los administradores
                  </Button>
                </Col>
              </CRow>
            </CForm>
          </>
        )}
      </CModalBody>
      <CModalFooter>
        <Button type="primary" className="bg-dark" onClick={hideThisModal}>
          Cerrar
        </Button>
      </CModalFooter>
    </CModal>
  );
};
