import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { messageHandler } from "src/components/helpers/";

const Users = () => {
  const { successMessage, errorMessage, statusDataUser } = useSelector(
    (state) => state.users
  );

  const [tab, setTab] = useState("users");

  // mensajes de las peticiones
  useEffect(() => {
    if (statusDataUser !== null) {
      messageHandler(errorMessage, successMessage, statusDataUser);
    } else {
      messageHandler(errorMessage);
    }
  }, [errorMessage, statusDataUser]);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <h1 className="fs-5 mb-3">Usuarios</h1>
          <CRow>
            <CCol xs>
              <CCard>
                <CCardHeader style={{ fontSize: "18px", fontWeight: 500 }}>
                  Todos los usuarios
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
