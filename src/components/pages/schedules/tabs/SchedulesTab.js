import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDays, getAllSchedules, updateSchedule } from "src/store";

import { CButton, CCol, CRow } from "@coreui/react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";

import { AddScheduleModal } from "../modals";

export const SchedulesTab = () => {
  const dispatch = useDispatch();
  const { schedules, statusDataSchedule } = useSelector(
    (state) => state.classes
  );
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusAddScheduleModal, setStatusAddScheduleModal] = useState(false);
  const [dataSchedule, setDataSchedule] = useState({});

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllSchedules());
    dispatch(getAllDays());
  }, []);

  // se consultan datos si se hizo crud
  useEffect(() => {
    if (statusDataSchedule !== null) {
      dispatch(getAllSchedules());
      hideModal();
    }
  }, [statusDataSchedule]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (schedules) {
      if (schedules.length !== 0) {
        const data = [...schedules];
        setRows(data);
      }
    }
  }, [schedules]);

  // datos para la grid
  const columns = [
    {
      key: "actions",
      name: "Acciones",
      resizable: true,
      width: 110,
      renderCell: ({ row }) => {
        const onClickEdit = () => {
          setDataSchedule(row);
          showAddScheduleModal();
        };
        const onClickDelete = () => {
          // setDataSchedule(row);
          // setStatusDeleteCareerModal(true);
        };
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton
              title="Editar"
              color="info"
              className="text-white"
              onClick={onClickEdit}
            >
              <FAIcon customClass="icon" icon={faEdit} />
            </CButton>
            <CButton
              title="Eliminar"
              color="danger"
              className="text-white"
              onClick={onClickDelete}
            >
              <FAIcon customClass="icon" icon={faTrash} />
            </CButton>
          </div>
        );
      },
    },
    {
      key: "dayId",
      name: "Día",
      width: 90,
      resizable: true,
      renderCell: ({ row }) => {
        return <span title={row?.day?.name}>{row?.day?.name}</span>;
      },
    },
    {
      key: "startTime",
      name: "Hora de inicio",
      width: 120,
      resizable: true,
    },
    {
      key: "endTime",
      name: "Hora de cierre",
      width: 120,
      resizable: true,
    },
    {
      key: "classId",
      name: "Clase",
      minWidth: 200,
      resizable: true,
      renderCell: ({ row }) => {
        return (
          <span title={row?.classs?.denomination}>
            {row?.classs?.denomination}
          </span>
        );
      },
    },
    {
      key: "status",
      name: "Estado",
      width: 110,
      resizable: true,
      renderCell: ({ row }) => {
        const onClickStatus = () => {
          dispatch(updateSchedule({ id: row.id, status: !row.status }));
        };
        return (
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton
              title="Cambiar estado"
              color={row.status ? "success" : "danger"}
              className="text-white"
              onClick={onClickStatus}
            >
              {row.status ? "Activo" : "Inactivo"}
            </CButton>
          </div>
        );
      },
    },
  ];

  // buscador
  const filter = (rows) => {
    return (
      rows.filter((row) =>
        Object.values(row).some(
          (value) =>
            value?.toString().toLowerCase().includes(search.toLowerCase()) ||
            value?.name?.toString().toLowerCase().includes(search.toLowerCase())
        )
      ) || rows
    );
  };

  // muestra modal para agregar horario
  const showAddScheduleModal = () => {
    setStatusAddScheduleModal(true);
  };

  const hideModal = () => {
    setDataSchedule({});
    setStatusAddScheduleModal(false);
  };

  return (
    <>
      <CRow className="mt-3 mb-2">
        <CCol>
          <CButton
            color="success"
            className="text-white"
            onClick={showAddScheduleModal}
          >
            Registrar
          </CButton>
        </CCol>
        <CCol sm={9} lg={6} className="mt-2 mt-sm-0">
          <input
            type="search"
            className="form-control"
            placeholder="Ingrese criterio de busqueda"
            onChange={(e) => setSearch(e.target.value)}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <div
            style={{
              height: 450,
              width: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Loader show={!schedules} center={true} />
            {schedules ? (
              <DataGrid
                className="rdg-light"
                columns={columns}
                rows={filter(rows) || []}
                rowHeight={50}
                style={{ height: 450 }}
                resizable
              />
            ) : (
              <></>
            )}
          </div>
        </CCol>
      </CRow>
      <AddScheduleModal
        statusAddScheduleModal={statusAddScheduleModal}
        hideAddScheduleModal={hideModal}
        dataSchedule={dataSchedule}
      />
    </>
  );
};
