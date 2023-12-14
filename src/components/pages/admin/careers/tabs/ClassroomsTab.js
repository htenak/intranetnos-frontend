import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClassroom,
  getAllClassrooms,
  saveClassroom,
  updateClassroom,
} from "src/store";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from "@coreui/react";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import DataGrid from "react-data-grid";
import Loader from "src/components/layout/loader/Loader";
import { toast } from "react-toastify";
import { ObligatoryField } from "src/components/pages/customComponents";
import { Button, Space } from "antd";

export const ClassroomsTab = () => {
  const dispatch = useDispatch();
  const { classrooms, statusDataClassroom } = useSelector(
    (state) => state.academic
  );

  const initialStateValues = {
    id: 0,
    number: 0,
    description: "",
  };
  const [values, setValues] = useState(initialStateValues);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusAddClassroom, setStatusAddClassroom] = useState(false);

  // se consultan datos al abrir
  useEffect(() => {
    dispatch(getAllClassrooms());
  }, []);

  // resetea values si se hizo CREATED
  useEffect(() => {
    if (statusDataClassroom !== "CREATED") {
      setValues(initialStateValues);
    }
  }, [statusDataClassroom]);

  // se asignan datos a un estado local
  useEffect(() => {
    if (classrooms) {
      if (classrooms.length !== 0) {
        const data = [...classrooms];
        setRows(data.sort((a, b) => a.number - b.number));
      } else {
        setRows([]);
      }
    }
  }, [classrooms]);

  // captura datos de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "number") {
      setValues({ ...values, number: parseInt(value) });
      return;
    }
    setValues({ ...values, [name]: value });
  };

  // envia datos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(values?.number) <= 0) {
      return toast.error("N° de aula inválido");
    }

    let mod = values;
    mod = {
      ...mod,
      description: mod.description.toUpperCase(),
    };

    if (mod?.id === 0) {
      dispatch(saveClassroom(mod));
    } else {
      dispatch(updateClassroom(mod));
      hideAddClassroom();
    }
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
          setValues(row);
          showAddClassroomModal();
        };
        const onClickDelete = () => {
          const confirm = window.confirm(
            "Por favor, confirma esta acción: (eliminar)"
          );
          if (confirm) {
            dispatch(deleteClassroom(row));
            return;
          }
        };
        return (
          <Space className="d-flex justify-content-center">
            <Button
              title="Editar"
              type="default"
              className="p-0 px-2"
              onClick={onClickEdit}
            >
              <FAIcon customClass="icon" icon={faEdit} />
            </Button>
            <Button
              title="Eliminar"
              type="default"
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
      key: "number",
      name: "N° de aula",
      width: 105,
      resizable: true,
      renderCell: ({ row }) => {
        return <div className="text-center">{row.number}</div>;
      },
    },
    {
      key: "description",
      name: "Descripción",
      minWidth: 130,
      resizable: true,
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

  // muestra modal de agregar aula
  const showAddClassroomModal = () => {
    setStatusAddClassroom(true);
  };

  const hideAddClassroom = () => {
    setValues(initialStateValues);
    setStatusAddClassroom(false);
  };

  return (
    <>
      <CRow className="mt-3 mb-2">
        <CCol>
          <Button
            type="primary"
            style={{ background: "green" }}
            onClick={showAddClassroomModal}
          >
            Registrar
          </Button>
          {statusAddClassroom && (
            <Button
              type="primary"
              title="Ocultar formulario"
              style={{ marginLeft: 8 }}
              danger
              onClick={hideAddClassroom}
            >
              <FAIcon customClass="icon" icon={faTimes} />
            </Button>
          )}
        </CCol>
        {!statusAddClassroom && (
          <CCol sm={9} lg={6} className="mt-2 mt-sm-0">
            <input
              type="search"
              className="form-control"
              placeholder="Ingrese criterio de busqueda"
              onChange={(e) => setSearch(e.target.value)}
            />
          </CCol>
        )}
      </CRow>
      {statusAddClassroom && (
        <CCard className="mb-3">
          <CCardHeader style={{ background: "green", color: "#fff" }}>
            <CCardTitle className="fs-6 m-0">
              {values?.id ? "Editar aula" : "Nueva aula"}
            </CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol lg={2}>
                  <CFormLabel className="mb-1">
                    N° de aula <ObligatoryField />
                  </CFormLabel>
                  <CFormInput
                    style={{ fontSize: "99%" }}
                    type="number"
                    min={1}
                    step={1}
                    placeholder="Ejemplo: 1"
                    name="number"
                    value={values?.number || ""}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol lg={8} className="mt-2 mt-lg-0">
                  <CFormLabel className="mb-1">Descripción</CFormLabel>
                  <CFormInput
                    style={{ fontSize: "99%" }}
                    type="text"
                    placeholder="Breve descripción"
                    name="description"
                    value={values?.description || ""}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol
                  lg={2}
                  className="mt-3 mt-lg-0 text-center text-lg-start align-self-end"
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ background: "green" }}
                  >
                    {values?.id !== 0 ? "Actualizar" : "Guardar"}
                  </Button>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      )}
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
            <Loader show={!classrooms} center={true} />
            {classrooms ? (
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
    </>
  );
};
