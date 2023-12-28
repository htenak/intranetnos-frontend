import locale from "antd/es/date-picker/locale/es_ES";
import dayjs from "dayjs";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
} from "@coreui/react";
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { ObligatoryField } from "src/components/pages/customComponents";
import { useEffect, useState } from "react";
import { saveActivity, updateActivity } from "src/store";
import { toast } from "react-toastify";
import { FAIcon } from "src/assets/icon/FAIcon";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

export const AddActivity = ({ getAndSetActivityToEdit, valuesToEdit }) => {
  const dispatch = useDispatch();
  const { activityTypes, statusDataActivity } = useSelector(
    (state) => state.activitiesProfessor
  );
  const { classesProfessor } = useSelector((state) => state.classesProfessor);

  const initialValues = {
    id: 0,
    name: "",
    description: "",
    minGrade: 5,
    maxGrade: 20,
    dueDate: "",
    activityTypeId: 0,
    classId: 0,
  };
  const [values, setValues] = useState(initialValues);
  const [optionsActivityTypes, setOptionsActivityTypes] = useState([]);
  const [optionsClasses, setOptionsClasses] = useState([]);

  // setea values si se hizo click en editar
  useEffect(() => {
    if (valuesToEdit !== null) {
      setValues(valuesToEdit);
    }
  }, [valuesToEdit]);

  // reinicia los values si se creó o actualizó
  useEffect(() => {
    if (statusDataActivity === "CREATED" || statusDataActivity === "UPDATED") {
      cleanValues();
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

  // clases para el select
  useEffect(() => {
    if (classesProfessor) {
      if (classesProfessor && classesProfessor.length !== 0) {
        setOptionsClasses(
          classesProfessor
            .filter((c) => c.status)
            .map((c) => ({
              ...c,
              label: `${c.cycle?.abbreviation} ciclo • ${c.course?.name} • ${c.career?.name}`,
              value: parseInt(c.id),
            }))
        );
      } else {
        setOptionsClasses([]);
      }
    }
  }, [classesProfessor]);

  // captura cambios en select de clase
  const handleActivityTypeChange = (value) => {
    setValues({
      ...values,
      activityTypeId: value,
    });
  };

  // captura cambios en select de clase
  const handleClassChange = (value) => {
    setValues({
      ...values,
      classId: value,
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

  // limpiar values
  const cleanValues = () => {
    getAndSetActivityToEdit(null);
    setValues(initialValues);
  };

  // enviar peticion actualizar  o crear
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

    if (values?.id !== 0) {
      dispatch(updateActivity(values));
    } else {
      dispatch(saveActivity(values));
    }
  };

  return (
    <CCard
      style={{
        border: "1px solid #008B02",
      }}
      className="h-100"
    >
      <CCardHeader
        style={{
          background: "#008B02",
          color: "#fff",
        }}
      >
        Registrar actividades
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol xs={12}>
              <label>
                Tipo de actividad <ObligatoryField />
              </label>
              <Spin spinning={!activityTypes}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Seleccionar"
                  value={values?.activityTypeId || null}
                  onChange={handleActivityTypeChange}
                  options={optionsActivityTypes}
                />
              </Spin>
            </CCol>
            <CCol xs={12} className="mt-2">
              <label>
                Clase a asginar <ObligatoryField />
              </label>
              <Spin spinning={!classesProfessor}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Seleccionar"
                  value={values?.classId || null}
                  onChange={handleClassChange}
                  options={optionsClasses}
                />
              </Spin>
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
            <CCol xs={12} className="mt-2 mb-2">
              <label>
                Descripción <ObligatoryField />
              </label>
              <TextArea
                rows={3}
                onChange={handleInputTextChange}
                placeholder="Describe la actividad..."
                name="description"
                value={values?.description || ""}
              />
            </CCol>
            <CCol xs={6} lg={3}>
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
            <CCol xs={6} lg={3}>
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
            <CCol xs={6} lg={3}>
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
            <CCol xs={6} lg={3} className="text-center align-self-end">
              <Space>
                {values?.id !== 0 ? (
                  <Button
                    title="Limpiar"
                    type="link"
                    danger
                    onClick={cleanValues}
                    className="p-0 px-2"
                  >
                    <FAIcon icon={faTimes} />
                  </Button>
                ) : (
                  <></>
                )}
                <Button
                  title="Guardar"
                  type="primary"
                  style={{ background: "#008B02" }}
                  htmlType="submit"
                >
                  <FAIcon icon={faSave} />
                </Button>
              </Space>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  );
};
