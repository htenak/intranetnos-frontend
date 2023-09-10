import React from "react";
import { useDispatch } from "react-redux";
import { CNavItem, CNavLink } from "@coreui/react";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

import { FAIcon } from "src/assets/icon/FAIcon";
import { logout } from "src/store";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div onClick={handleLogout} style={{ cursor: "pointer" }}>
      <CNavItem>
        <CNavLink>
          <FAIcon customClass="icon nav-icon text-danger" icon={faPowerOff} />
          Cerrar sesión
        </CNavLink>
      </CNavItem>
    </div>
  );
};

export default Logout;
