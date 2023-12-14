import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCycles, getAllSchedules, updateSchedule } from "src/store";

import { CCol, CFormSelect, CRow } from "@coreui/react";
import { Button, Space } from "antd";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";
import { hourAmPmFormat } from "src/components/helpers/hourAmPmFormat";

import { AddScheduleModal, DeleteScheduleModal } from "../modals";

export const SchedulesTab = ({ careerIdTab, careerNameTab }) => {
  const dispatch = useDispatch();
  const { schedules, statusDataSchedule } = useSelector(
    (state) => state.classes
  );
  const { cycles } = useSelector((state) => state.academic);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusAddScheduleModal, setStatusAddScheduleModal] = useState(false);
  const [statusDeleteScheduleModal, setStatusDeleteScheduleModal] =
    useState(false);
  const [dataSchedule, setDataSchedule] = useState({});
  const [cycleIdSchedule, setCycleIdSchedule] = useState(0);

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllCycles());
    dispatch(getAllSchedules());
  }, []);

  // se consultan datos si se hizo crud
  useEffect(() => {
    if (statusDataSchedule !== null) {
      hideModal();
    }
  }, [statusDataSchedule]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (careerIdTab && schedules && schedules.length !== 0) {
      let filteredData = [...schedules];
      if (parseInt(careerIdTab) !== 0) {
        filteredData = filteredData.filter(
          (d) => parseInt(d.classs?.careerId) === parseInt(careerIdTab)
        );
      }
      if (parseInt(cycleIdSchedule) !== 0) {
        filteredData = filteredData.filter(
          (d) => parseInt(d.classs?.cycleId) === parseInt(cycleIdSchedule)
        );
      }
      // retorna filas validadas
      setRows(filteredData);
    } else {
      setRows([]);
    }
  }, [careerIdTab, schedules, cycleIdSchedule]);

  // va guardando el cycleId en localStorage
  useEffect(() => {
    if (cycleIdSchedule) {
      localStorage.setItem("cycleIdSchedule", cycleIdSchedule);
    }
  }, [cycleIdSchedule]);

  // asigna el id ciclo si hay registro y si existe, sino todos
  useEffect(() => {
    if (rows && rows.length !== 0) {
      if (localStorage.getItem("cycleIdSchedule")) {
        setCycleIdSchedule(parseInt(localStorage.getItem("cycleIdSchedule")));
        return;
      }
      setCycleIdSchedule(0);
    }
  }, [rows]);

  // guarda id de ciclo en un estado
  const handleChangeCycle = (e) => {
    setCycleIdSchedule(e.target.value);
  };

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
          setDataSchedule(row);
          setStatusDeleteScheduleModal(true);
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button title="Editar" className="p-0 px-2" onClick={onClickEdit}>
              <FAIcon customClass="icon" icon={faEdit} />
            </Button>
            <Button
              title="Eliminar"
              style={{ color: "red" }}
              className="p-0 px-2"
              onClick={onClickDelete}
            >
              <FAIcon customClass="icon" icon={faTrash} />
            </Button>
          </Space>
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
      name: "Inicio",
      width: 90,
      resizable: true,
      renderCell: ({ row }) => {
        return (
          <span title={hourAmPmFormat(row.startTime)}>
            {hourAmPmFormat(row.startTime)}
          </span>
        );
      },
    },
    {
      key: "endTime",
      name: "Cierre",
      width: 90,
      resizable: true,
      renderCell: ({ row }) => {
        return (
          <span title={hourAmPmFormat(row.endTime)}>
            {hourAmPmFormat(row.endTime)}
          </span>
        );
      },
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
          <Space className="d-flex justify-content-center">
            <Button
              title="Cambiar estado"
              type="primary"
              className={row.status ? "bg-success" : "bg-danger"}
              onClick={onClickStatus}
            >
              {row.status ? "Activo" : "Inactivo"}
            </Button>
          </Space>
        );
      },
    },
  ];

  // buscador
  const filter = (rows) => {
    return (
      rows
        .filter((row) =>
          Object.values(row).some(
            (value) =>
              value?.toString().toLowerCase().includes(search.toLowerCase()) ||
              value?.name
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              value?.denomination
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase())
          )
        )
        .sort((a, b) => a.dayId - b.dayId) || rows
    );
  };

  // muestra modal para agregar horario
  const showAddScheduleModal = () => {
    setStatusAddScheduleModal(true);
  };

  const hideModal = () => {
    setDataSchedule({});
    setStatusAddScheduleModal(false);
    setStatusDeleteScheduleModal(false);
  };

  return (
    <>
      <CRow className="mt-3 mb-2">
        <CCol>
          <Button
            type="primary"
            style={{ background: "green" }}
            onClick={showAddScheduleModal}
          >
            Registrar
          </Button>
        </CCol>
        <CCol xs={7} lg={3}>
          <CFormSelect
            onChange={handleChangeCycle}
            value={cycleIdSchedule || 0}
            style={{ fontSize: "99.5%" }}
          >
            <option value={0}>Todos los ciclos</option>
            {cycles && cycles.length !== 0 ? (
              <>
                {cycles.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.abbreviation} ciclo
                  </option>
                ))}
              </>
            ) : (
              <option>No hay ciclos</option>
            )}
          </CFormSelect>
        </CCol>
        <CCol xs={12} lg={6} className="mt-2 mt-lg-0">
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
        careerIdTab={careerIdTab}
        cycleIdSchedule={cycleIdSchedule}
        careerNameTab={careerNameTab}
      />
      <DeleteScheduleModal
        statusDeleteScheduleModal={statusDeleteScheduleModal}
        hideDeleteScheduleModal={hideModal}
        dataSchedule={dataSchedule}
      />
    </>
  );
};
