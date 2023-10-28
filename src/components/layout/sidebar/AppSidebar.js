import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";

import navigation from "../../../router/Navigation";
import AppSidebarNav from "./AppSidebarNav";

import logoNor from "src/assets/images/nor_logo.jpeg";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config

import { setNav, setUnfoldable } from "src/store";
import { Link } from "react-router-dom";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const { sidebarShow, unfoldableShow } = useSelector((state) => state.nav);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("unfoldStoraged") === "true") {
      dispatch(setUnfoldable(false));
      return;
    }
    dispatch(setUnfoldable(true));
  }, []);

  const onClickUnfoldNav = () => {
    dispatch(setUnfoldable(!unfoldableShow));
    localStorage.setItem("unfoldStoraged", unfoldableShow);
  };

  return (
    <CSidebar
      position="fixed"
      unfoldable={!unfoldableShow}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setNav(visible));
      }}
      style={{ background: "green" }}
    >
      <CSidebarBrand className="d-none d-md-flex">
        <Link className="sidebar-brand-full text-white" to="/">
          NOS INTRANET
          <img
            src={logoNor}
            style={{ width: 40, marginLeft: 10, borderRadius: 300 }}
          />
        </Link>
        <span>
          <img
            className="sidebar-brand-narrow"
            src={logoNor}
            style={{
              width: 40,
              borderRadius: 300,
            }}
          />
        </span>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} userRole={user.role.name} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        title="Encoger / Expandir"
        className="d-none d-lg-flex"
        onClick={onClickUnfoldNav}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
