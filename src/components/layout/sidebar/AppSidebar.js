import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";

import logoNor from "src/assets/images/logos/nor_logo.jpeg";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../../../_nav";
import { setNav } from "src/store/slices/nav";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.navReducer.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setNav(visible));
      }}
      style={{ background: "green" }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        NOS INTRANET
        <img
          src={logoNor}
          style={{ width: "40px", marginLeft: "10px", borderRadius: "300px" }}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
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
