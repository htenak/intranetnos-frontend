import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
} from "@coreui/react";
import { RolesTab, UsersTab } from "./tabs";

const Users = () => {
  const { successMessage, errorMessage } = useSelector((state) => state.users);

  const [tab, setTab] = useState("users");

  // mensajes de las peticiones
  useEffect(() => {
    if (errorMessage !== undefined) {
      toast.error(errorMessage);
    }
    if (successMessage !== undefined) {
      toast.success(successMessage);
    }
  }, [errorMessage, successMessage]);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-4 mb-3">Usuarios</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Lista de todos los usuarios
                </CCardHeader>
                <CCardBody>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        role="button"
                        onClick={() => setTab("users")}
                        active={tab === "users"}
                        className={
                          tab === "users" ? "text-success" : "text-dark"
                        }
                      >
                        Usuarios
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        role="button"
                        onClick={() => setTab("roles")}
                        active={tab === "roles"}
                        className={
                          tab === "roles" ? "text-success" : "text-dark"
                        }
                      >
                        Roles
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  {tab === "users" ? <UsersTab /> : <></>}
                  {tab === "roles" ? <RolesTab /> : <></>}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};
export default Users;
