import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import {
  deleteActivity,
  updateActivity,
  getAllClassesProfessor,
} from "src/store";
import { friendlyDateFormat } from "src/components/helpers";

export const ActivitiesRecords = ({ getAndSetActivityToEdit }) => {
  const dispatch = useDispatch();
  const { activities, activityTypes } = useSelector(
    (state) => state.activitiesProfessor
  );

  const [rows, setRows] = useState([]);

  // obtiene las clases del profesor
  useEffect(() => {
    dispatch(getAllClassesProfessor());
  }, []);

  useEffect(() => {
    if (activities) {
      if (activities.length !== 0) {
        const data = [...activities];
        setRows(
          data.map((at) => ({ ...at, key: at.id })).sort((a, b) => b.id - a.id)
        );
      } else {
        setRows([]);
      }
    }
  }, [activities]);

  const columns = [
    {
      dataIndex: "actions",
      title: "Acciones",
      width: 90,
      align: "center",
      rowScope: "row",
      render: (text, record) => {
        const onClickEdit = () => {
          getAndSetActivityToEdit(record);
        };
        const onClickDelete = () => {
          dispatch(deleteActivity(record));
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
      dataIndex: "id",
      title: "N° Actividad",
      align: "center",
      width: 100,
      render: (_, { id }) => {
        return <span>{String(id).padStart(7, "0")}</span>;
      },
    },
    {
      dataIndex: "name",
      title: "Nombre",
      width: 170,
    },
    {
      dataIndex: "description",
      title: "Actividad",
      render: (_, { description, classs }) => {
        return (
          <>
            <span
              style={{ fontWeight: 500 }}
            >{`${classs.cycle?.abbreviation} • ${classs.course?.abbreviation} • ${classs.career?.name}`}</span>
            <br />
            <span style={{ fontWeight: 300 }}>{description}</span>
          </>
        );
      },
    },
    {
      dataIndex: "dueDate",
      title: "Fecha límite",
      width: 110,
      align: "center",
      render: (_, { dueDate }) => {
        return <span>{friendlyDateFormat(dueDate)}</span>;
      },
    },
    {
      dataIndex: "activityTypeId",
      title: "Tipo de actividad",
      width: 130,
      render: (_, { activityTypeId }) => {
        if (activityTypes && activityTypes.length !== 0) {
          const activityType = activityTypes.find(
            (at) => at.id == activityTypeId
          );
          return <span>{activityType?.name}</span>;
        }
        return "-";
      },
    },
    {
      dataIndex: "status",
      title: "Estado",
      width: 90,
      align: "center",
      render: (_, { id, status }) => {
        const changeStatus = () => {
          dispatch(updateActivity({ id, status: !status }));
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
        pagination={{ pageSize: 5 }}
        scroll={{ y: 410, x: 900 }}
        locale={{
          emptyText: "Ningún registro encontrado",
        }}
      />
    </div>
  );
};
