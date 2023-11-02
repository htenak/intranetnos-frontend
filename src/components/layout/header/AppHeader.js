import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CButton,
} from "@coreui/react";

import AppBreadcrumb from "./AppBreadcrumb";
import AppHeaderDropdown from "./AppHeaderDropdown";
import logoNor from "src/assets/images/nor_logo.png";

import { setNav } from "src/store/nav";
import { FAIcon } from "src/assets/icon/FAIcon";
import { faBars, faRotateRight } from "@fortawesome/free-solid-svg-icons";

const AppHeader = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.nav);

  const onClickReload = () => {
    window.location.reload();
  };

  return (
    <CHeader position="sticky" className="mb-3">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(setNav(!sidebarShow))}
          title="Ocultar / Mostrar"
        >
          <FAIcon customClass="icon" icon={faBars} />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
          <img src={logoNor} style={{ width: "60px", borderRadius: "300px" }} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink
              to="/dashboard"
              component={NavLink}
              active={window.location.pathname === "/dashboard"}
            >
              Inicio
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">ContactaNOS</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ml-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
        <CButton
          style={{ marginRight: "8px", color: "#fff" }}
          color="warning"
          onClick={onClickReload}
          title="Refrescar página"
        >
          <FAIcon customClass="icon" icon={faRotateRight} />
        </CButton>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
