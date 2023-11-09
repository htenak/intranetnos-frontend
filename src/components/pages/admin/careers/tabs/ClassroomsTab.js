import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClassroom,
  getAllClassrooms,
  saveClassroom,
  updateClassroom,
} from "src/store";

import {
  CButton,
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

    if (values?.id === 0) {
      dispatch(saveClassroom(values));
      setValues(initialStateValues);
    } else {
      dispatch(updateClassroom(values));
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
      key: "number",
      name: "N° de aula",
      width: 150,
      resizable: true,
    },
    {
      key: "description",
      name: "Descripción",
      minWidth: 90,
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

  console.log(values);

  return (
    <>
      <CRow className="mt-3 mb-2">
        <CCol>
          <CButton
            color="success"
            className="text-white"
            onClick={showAddClassroomModal}
          >
            Registrar
          </CButton>
          {statusAddClassroom && (
            <CButton
              color="danger"
              className="mx-2 text-white"
              title="Ocultar formulario"
              onClick={hideAddClassroom}
            >
              <FAIcon customClass="icon" icon={faTimes} />
            </CButton>
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
        <CCard className="mb-2">
          <CCardHeader className="bg-success text-white">
            <CCardTitle className="fs-6 m-0">{"Nueva aula"}</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol lg={2}>
                  <CFormLabel className="mb-1">
                    N° de aula <ObligatoryField />
                  </CFormLabel>
                  <CFormInput
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
                  <CButton
                    color={"success"}
                    className="text-white"
                    type="submit"
                  >
                    Guardar
                  </CButton>
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
