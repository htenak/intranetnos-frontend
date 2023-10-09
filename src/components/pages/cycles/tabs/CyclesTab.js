import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCycles, updateCycle } from "src/store";

import { CButton, CCol, CRow } from "@coreui/react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";
import { friendlyDateFormat } from "src/components/helpers/";

import { AddCycleModal, DeleteCycleModal } from "../modals";

export const CyclesTab = () => {
  const dispatch = useDispatch();
  const { cycles, statusDataCycle } = useSelector((state) => state.academic);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusAddCycleModal, setStatusAddCycleModal] = useState(false);
  const [statusDeleteCycleModal, setStatusDeleteCycleModal] = useState(false);
  const [dataCycle, setDataCycle] = useState({});

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllCycles());
  }, []);

  // se consultan datos si se hizo crud
  useEffect(() => {
    if (statusDataCycle !== null) {
      dispatch(getAllCycles());
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
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton color="info" className="text-white" onClick={onClickEdit}>
              <FAIcon customClass="icon" icon={faEdit} />
            </CButton>
            <CButton
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
      key: "abbreviation",
      name: "Ciclo",
      width: 90,
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
      width: 170,
      renderCell: ({ row }) => {
        return <>{friendlyDateFormat(row.startDate)}</>;
      },
    },
    {
      key: "endDate",
      name: "Fecha de cierre",
      resizable: true,
      width: 170,
      renderCell: ({ row }) => {
        return <>{friendlyDateFormat(row.endDate)}</>;
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
          <div className="h-100 d-flex justify-content-around align-items-center">
            <CButton
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
  };

  return (
    <>
      <CRow className="mt-3 mb-2">
        <CCol>
          <CButton
            color="success"
            className="text-white"
            onClick={showAddCycleModal}
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
          <div style={{ height: 450, width: "100%", overflow: "hidden" }}>
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
    </>
  );
};
