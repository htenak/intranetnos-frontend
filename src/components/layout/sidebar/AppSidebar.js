import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";

import navigation from "../../../_nav";
import AppSidebarNav from "./AppSidebarNav";

import logoNor from "src/assets/images/nor_logo.jpeg";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config

import { setNav } from "src/store";
import { Link } from "react-router-dom";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.nav);
  const { user } = useSelector((state) => state.auth);

  return (
    <CSidebar
      position="fixed"
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setNav(visible));
      }}
      style={{ background: "green" }}
    >
      <CSidebarBrand className="d-none d-md-flex">
        <Link className="text-white" to="/">
          NOS INTRANET
          <img
            src={logoNor}
            style={{ width: "40px", marginLeft: "10px", borderRadius: "300px" }}
          />
        </Link>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} userRole={user.role.name} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(setNav(!sidebarShow))}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
