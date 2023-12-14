import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCycles, updateCycle } from "src/store";

import { CButton, CCol, CRow } from "@coreui/react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";
import { friendlyDateFormat } from "src/components/helpers/";

import { AddCycleModal, DeleteCycleModal, InfoCoursesModal } from "../modals";
import { Button, Space } from "antd";

export const CyclesRecords = () => {
  const dispatch = useDispatch();
  const { cycles, statusDataCycle } = useSelector((state) => state.academic);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusAddCycleModal, setStatusAddCycleModal] = useState(false);
  const [statusDeleteCycleModal, setStatusDeleteCycleModal] = useState(false);
  const [statusInfoCoursesModal, setStatusInfoCoursesModal] = useState(false);
  const [dataCycle, setDataCycle] = useState({});

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllCycles());
  }, []);

  // se cierra modal si hay crud
  useEffect(() => {
    if (statusDataCycle !== null) {
      hideModal();
    }
  }, [statusDataCycle]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (cycles) {
      if (cycles.length !== 0) {
        const data = [...cycles];
        setRows(data.sort((a, b) => b.id - a.id));
      }
    }
  }, [cycles]);

  // datos para la grid
  const columns = [
    {
      key: "actions",
      name: "Acciones",
      resizable: true,
      width: 110,
      renderCell: ({ row }) => {
        const onClickEdit = () => {
          setDataCycle(row);
          showAddCycleModal();
        };
        const onClickDelete = () => {
          setDataCycle(row);
          setStatusDeleteCycleModal(true);
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button
              title="Editar"
              color="info"
              className="p-0 px-2"
              onClick={onClickEdit}
            >
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
      key: "abbreviation",
      name: "Ciclos",
      width: 70,
      resizable: true,
      renderCell: ({ row }) => {
        return <div className="text-center">{row.abbreviation}</div>;
      },
    },
    {
      key: "description",
      name: "Descripción",
      minWidth: 130,
      resizable: true,
    },
    {
      key: "startDate",
      name: "Fecha de inicio",
      resizable: true,
      width: 180,
      renderCell: ({ row }) => {
        return <span>{friendlyDateFormat(row.startDate)}</span>;
      },
    },
    {
      key: "endDate",
      name: "Fecha de cierre",
      resizable: true,
      width: 180,
      renderCell: ({ row }) => {
        return <span>{friendlyDateFormat(row.endDate)}</span>;
      },
    },
    {
      key: "courses",
      name: "Cursos",
      resizable: true,
      width: 110,
      renderCell: ({ row }) => {
        const onClick = () => {
          setDataCycle(row);
          setStatusInfoCoursesModal(true);
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button
              onClick={onClick}
              title="Ver cursos en este ciclo"
              className="text-primary"
            >
              Cursos
            </Button>
          </Space>
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
          dispatch(updateCycle({ id: row.id, status: !row.status }));
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button
              type="primary"
              title="Cambiar estado"
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
      rows.filter((row) =>
        Object.values(row).some((value) =>
          value?.toString().toLowerCase().includes(search.toLowerCase())
        )
      ) || rows
    );
  };

  // muestra modal de agregar ciclo
  const showAddCycleModal = () => {
    setStatusAddCycleModal(true);
  };

  const hideModal = () => {
    setDataCycle({});
    setStatusAddCycleModal(false);
    setStatusDeleteCycleModal(false);
    setStatusInfoCoursesModal(false);
  };

  return (
    <>
      <CRow className="mb-2">
        <CCol>
          <Button
            type="primary"
            style={{ background: "green" }}
            onClick={showAddCycleModal}
          >
            Registrar
          </Button>
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
          <div style={{ height: 400, width: "100%", overflow: "hidden" }}>
            <Loader show={!cycles} center={true} />
            {cycles ? (
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
      <AddCycleModal
        statusAddCycleModal={statusAddCycleModal}
        hideAddCycleModal={hideModal}
        dataCycle={dataCycle}
      />
      <DeleteCycleModal
        statusDeleteCycleModal={statusDeleteCycleModal}
        hideDeleteCycleModal={hideModal}
        dataCycle={dataCycle}
      />
      <InfoCoursesModal
        statusInfoCoursesModal={statusInfoCoursesModal}
        hideInfoCoursesModal={hideModal}
        dataCycle={dataCycle}
      />
    </>
  );
};
