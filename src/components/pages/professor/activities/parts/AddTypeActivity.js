import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
} from "@coreui/react";
import {
  faEdit,
  faSave,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteActivityType,
  saveActivityType,
  updateActivityType,
} from "src/store";
import { FAIcon } from "src/assets/icon/FAIcon";
import { toast } from "react-toastify";

export const AddTypeActivity = () => {
  const dispatch = useDispatch();
  const { activityTypes, statusDataActivityType } = useSelector(
    (state) => state.activitiesProfessor
  );

  const initialValues = { id: 0, name: "" };
  const [values, setValues] = useState(initialValues);
  const [rows, setRows] = useState([]);

  // reinicia los values si se creó o actualizó
  useEffect(() => {
    if (
      statusDataActivityType === "CREATED" ||
      statusDataActivityType === "UPDATED"
    ) {
      setValues(initialValues);
    }
  }, [statusDataActivityType]);

  // guarda los datos en el estado rows
  useEffect(() => {
    if (activityTypes) {
      if (activityTypes.length !== 0) {
        const data = [...activityTypes];
        setRows(data.map((at) => ({ ...at, key: at.id })));
      } else {
        setRows([]);
      }
    }
  }, [activityTypes]);

  // captura los inputs
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  // limpiar values
  const cleanValues = () => {
    setValues(initialValues);
  };

  // envia peticion actualizar o crear
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.name.trim() == "") {
      return toast.error("Campo nombre no debe estar vacío");
    }
    if (values.id !== 0) {
      dispatch(updateActivityType(values));
    } else {
      dispatch(saveActivityType(values));
    }
  };

  const columns = [
    {
      dataIndex: "actions",
      title: "Acciones",
      width: 90,
      rowScope: "row",
      align: "center",
      render: (text, record) => {
        const onClickEdit = () => {
          setValues({
            id: parseInt(record.id),
            name: record.name,
          });
        };
        const onClickDelete = () => {
          dispatch(deleteActivityType(record));
        };
        return (
          <Space>
            <Button type="link" className="p-0 px-1" onClick={onClickEdit}>
              <FAIcon icon={faEdit} />
            </Button>
            <Popconfirm
              title="¿Desea continuar?"
              cancelText="Cancelar"
              okText="Sí"
              onConfirm={onClickDelete}
            >
              <Button type="link" className="p-0 px-1" danger>
                <FAIcon icon={faTrash} />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
    {
      dataIndex: "name",
      title: "Tipo de actividad",
    },
    {
      dataIndex: "status",
      title: "Estado",
      width: 90,
      align: "center",
      render: (_, { id, status }) => {
        const changeStatus = () => {
          dispatch(updateActivityType({ id, status: !status }));
        };
        return (
          <Tooltip title="Cambiar estado">
            <Tag
              color={status ? "#87d068" : "#f50"}
              style={{ cursor: "pointer" }}
              onClick={changeStatus}
            >
              {status ? "Activo" : "Inactivo"}
            </Tag>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <CCard
      style={{
        border: "1px solid #006B76",
      }}
      className="h-100"
    >
      <CCardHeader
        style={{
          background: "#006B76",
          color: "#fff",
        }}
      >
        Gestiónar tus tipos de actividad
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol lg={8} xl={9}>
              <Input
                placeholder="Nombre del tipo de la actividad *"
                name="name"
                onChange={handleInputChange}
                value={values.name || ""}
              />
            </CCol>
            <CCol
              lg={3}
              xl={2}
              className="mt-2 mt-lg-0 text-end text-lg-center"
            >
              <Space>
                {values?.id !== 0 ? (
                  <Button
                    title="Limpiar"
                    type="link"
                    htmlType="reset"
                    danger
                    onClick={cleanValues}
                    className="p-0 px-1"
                  >
                    <FAIcon icon={faTimes} />
                  </Button>
                ) : (
                  <></>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ background: "#006B76" }}
                >
                  <FAIcon icon={faSave} />
                </Button>
              </Space>
            </CCol>
          </CRow>
          <CRow className="mt-2">
            <CCol xs={12}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <Table
                  columns={columns}
                  dataSource={rows}
                  size="small"
                  bordered
                  pagination={{ pageSize: 4 }}
                  scroll={{ y: 210, x: 280 }}
                  locale={{
                    emptyText: "Ningún registro encontrado",
                  }}
                />
              </div>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  );
};
