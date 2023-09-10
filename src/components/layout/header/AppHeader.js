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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

import AppBreadcrumb from "./AppBreadcrumb";
import AppHeaderDropdown from "./AppHeaderDropdown";
import logoNor from "src/assets/images/nor_logo.png";

import { setNav } from "src/store/nav";

const AppHeader = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.nav);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(setNav(!sidebarShow))}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
          <img src={logoNor} style={{ width: "60px", borderRadius: "300px" }} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
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
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
