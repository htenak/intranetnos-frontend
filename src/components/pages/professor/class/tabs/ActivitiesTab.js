import { useEffect, useState } from "react";
import locale from "antd/es/date-picker/locale/es_ES";
import dayjs from "dayjs";
import { CCol, CRow } from "@coreui/react";
import {
  Avatar,
  Button,
  DatePicker,
  Empty,
  Input,
  InputNumber,
  Popover,
  Select,
  Space,
  Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { intranetAvatarApi } from "src/api";
import {
  getActivitiesByClassId,
  getAllActivityTypes,
  saveActivity,
} from "src/store";
import { ObligatoryField } from "src/components/pages/customComponents";
import { friendlyDateFormat } from "src/components/helpers";
import { toast } from "react-toastify";
import imgUser from "src/assets/images/user.png";
import { FAIcon } from "src/assets/icon/FAIcon";
import {
  faComments,
  faEllipsisVertical,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";

export const ActivitiesTab = ({ propClass }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    activityTypes,
    activities,
    loadingActivitiesClass,
    statusDataActivity,
  } = useSelector((state) => state.activitiesProfessor);

  const initialValues = {
    classId: parseInt(propClass?.id),
    name: "",
    description: "",
    minGrade: 5,
    maxGrade: 20,
    dueDate: "",
    activityTypeId: 0,
  };
  const [values, setValues] = useState(initialValues);
  const [rows, setRows] = useState([]);
  const [optionsActivityTypes, setOptionsActivityTypes] = useState([]);
  const [statusNewActivity, setStatusNewActivity] = useState(false);

  useEffect(() => {
    setRows([]);
    dispatch(getAllActivityTypes());
  }, []);

  useEffect(() => {
    if (propClass) {
      if (propClass.id != 0) {
        dispatch(getActivitiesByClassId(propClass.id));
      }
    }
  }, [propClass]);

  // reinicia los values si se creó o actualizó
  useEffect(() => {
    if (statusDataActivity === "CREATED") {
      setValues(initialValues);
    }
  }, [statusDataActivity]);

  // tipos de actividad para el select
  useEffect(() => {
    if (activityTypes) {
      if (activityTypes && activityTypes.length !== 0) {
        setOptionsActivityTypes(
          activityTypes
            .filter((at) => at.status)
            .map((at) => ({
              ...at,
              label: `${at.name}`,
              value: parseInt(at.id),
            }))
        );
      } else {
        setOptionsActivityTypes([]);
      }
    }
  }, [activityTypes]);

  // actividades de la clase
  useEffect(() => {
    if (activities) {
      if (activities.length !== 0) {
        const data = [...activities];
        setRows(data.sort((a, b) => b.id - a.id));
      } else {
        setRows([]);
      }
    }
  }, [activities]);

  // captura cambios en select de clase
  const handleActivityTypeChange = (value) => {
    setValues({
      ...values,
      activityTypeId: value,
    });
  };

  // captura los inputs
  const handleInputTextChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // captura nota mínima
  const handleInputMinGradeChange = (value) => {
    if (value === null) {
      setValues({ ...values, minGrade: 0 });
    } else {
      setValues({ ...values, minGrade: 0 });
    }
  };

  // caṕtura nota máxima
  const handleInputMaxGradeChange = (value) => {
    if (value === null) {
      setValues({ ...values, maxGrade: 0 });
    } else {
      setValues({ ...values, maxGrade: value });
    }
  };

  // captura fecha
  const handleInputDateChange = (date, dateString) => {
    setValues({ ...values, dueDate: dateString });
  };

  // activa el formulario para nueva actividad
  const onClickNewActivity = () => {
    setStatusNewActivity(!statusNewActivity);
  };

  // enviar peticion para crear
  const handleSubmit = (e) => {
    e.preventDefault();

    if (values?.activityTypeId === 0) {
      return toast.error("Seleccione el tipo de actividad");
    }
    if (values?.classId === 0) {
      return toast.error("Seleccione la clase a asignar");
    }
    if (values?.name.trim() === "") {
      return toast.error("El nombre de la actividad es requerido");
    }
    if (values?.description.trim() === "") {
      return toast.error("La descripción de la actividad es requerido");
    }
    if (values?.minGrade === null) {
      return toast.error("La nota mínima es requerida");
    }
    if (values?.maxGrade === null) {
      return toast.error("La nota máxima es requerida");
    }
    if (values?.maxGrade <= values?.minGrade) {
      return toast.error(
        "La nota máxima no puede ser menor o igual a la nota mínima"
      );
    }
    if (values?.dueDate === "") {
      return toast.error("La fecha límite es requerida");
    }

    dispatch(saveActivity(values));
  };

  return (
    <section>
      <article>
        {!statusNewActivity ? (
          <div
            onClick={onClickNewActivity}
            style={{
              cursor: "pointer",
              padding: "16px 20px",
              border: "1px solid #eee",
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="d-flex">
              <div>
                <Avatar
                  size="large"
                  src={
                    !user.filename
                      ? imgUser
                      : `${intranetAvatarApi}/${user.filename}`
                  }
                />
              </div>
              <div
                style={{ marginLeft: 14 }}
                className="d-flex align-items-center text-secondary"
              >
                <span style={{ fontSize: 14 }}>
                  Registrar nueva actividad...
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CRow className="text-dark p-3 p-lg-4">
              <CCol xs={12}>
                <label>
                  Tipo de actividad <ObligatoryField />
                </label>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Seleccionar"
                  value={values?.activityTypeId || null}
                  onChange={handleActivityTypeChange}
                  options={optionsActivityTypes}
                />
              </CCol>
              <CCol xs={12} className="mt-2">
                <label>
                  Nombre de la actividad <ObligatoryField />
                </label>
                <Input
                  placeholder="Escribe el nombre"
                  name="name"
                  onChange={handleInputTextChange}
                  value={values?.name || ""}
                />
              </CCol>
              <CCol xs={12} className="mt-2">
                <label>
                  Descripción <ObligatoryField />
                </label>
                <TextArea
                  rows={3}
                  onChange={handleInputTextChange}
                  value={values?.description || ""}
                  placeholder="Describe la actividad..."
                  name="description"
                />
              </CCol>
              <CCol xs={12} sm={6} lg={2} className="mt-2">
                <label>
                  Nota mín. <ObligatoryField />
                </label>
                <InputNumber
                  style={{ width: "100%" }}
                  onChange={handleInputMinGradeChange}
                  value={values?.minGrade || ""}
                  placeholder="0"
                  min={0}
                />
              </CCol>
              <CCol xs={12} sm={6} lg={2} className="mt-2">
                <label>
                  Nota máx. <ObligatoryField />
                </label>
                <InputNumber
                  style={{ width: "100%" }}
                  onChange={handleInputMaxGradeChange}
                  value={values?.maxGrade || ""}
                  placeholder="0"
                  max={20}
                />
              </CCol>
              <CCol xs={12} sm={6} lg={3} className="mt-2">
                <label>
                  Fecha límite <ObligatoryField />
                </label>
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={handleInputDateChange}
                  value={values?.dueDate ? dayjs(values.dueDate) : null}
                  locale={locale}
                />
              </CCol>
              <CCol
                xs={12}
                sm={6}
                lg={5}
                className="align-self-end text-center text-sm-end mt-3 mt-sm-0"
              >
                <Space>
                  <Button
                    type="primary"
                    className="bg-dark"
                    onClick={onClickNewActivity}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{ background: "green" }}
                  >
                    Publicar
                  </Button>
                </Space>
              </CCol>
            </CRow>
          </div>
        )}
      </article>
      <article>
        <Spin spinning={loadingActivitiesClass}>
          {rows && rows.length !== 0 ? (
            <>
              {rows.map((row) => (
                <div
                  key={row.id}
                  style={{
                    padding: "16px 20px",
                    marginTop: 28,
                    border: "1px solid #e5e5e5",
                    borderRadius: 8,
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <Avatar
                          size="large"
                          src={
                            !user.filename
                              ? imgUser
                              : `${intranetAvatarApi}/${user.filename}`
                          }
                        />
                      </div>
                      <div style={{ marginLeft: 14 }}>
                        <strong
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          {user.name} {user.lastName1} {user.lastName2}
                        </strong>
                        <p className="m-0">
                          {friendlyDateFormat(row.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <Popover
                        // title={" "}
                        content={
                          <div>
                            <p
                              className="px-2 py-1 mb-1"
                              style={{ cursor: "pointer" }}
                            >
                              Editar
                            </p>
                            <p
                              className="px-2 py-1 m-0"
                              style={{ cursor: "pointer" }}
                            >
                              Eliminar
                            </p>
                          </div>
                        }
                        trigger="click"
                        placement="leftTop"
                      >
                        <Button type="link" style={{ color: "green" }}>
                          <FAIcon icon={faEllipsisVertical} />
                        </Button>
                      </Popover>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 300 }}>
                      <strong style={{ fontSize: 15, fontWeight: 500 }}>
                        {row.name || ""}
                      </strong>
                      <p className="m-0">
                        <span style={{ fontWeight: 500 }}>Tipo: </span>
                        {row.activityType?.name || ""}
                      </p>
                      <p className="m-0">
                        <span style={{ fontWeight: 500 }}>Vence: </span>
                        {friendlyDateFormat(row.dueDate) || ""}
                        {" • "}
                        <span
                          style={
                            row.status ? { color: "green " } : { color: "red" }
                          }
                        >
                          {row.status ? "Activo" : "Inactivo"}
                        </span>
                      </p>
                      <p style={{ fontWeight: 500 }} className="mt-1 mb-0">
                        Descripción:
                      </p>
                      <p className="m-0">{row.description || ""}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <strong
                        style={{
                          fontWeight: 500,
                          cursor: "pointer",
                          color: "green",
                        }}
                      >
                        <FAIcon icon={faComments} /> Ver comentarios
                      </strong>
                      <strong
                        style={{
                          marginLeft: 22,
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        <FAIcon icon={faFilePen} /> Calificar
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Empty
              style={{ padding: "50px 0" }}
              description={<span>Aún no hay registros...</span>}
            />
          )}
        </Spin>
      </article>
    </section>
  );
};
