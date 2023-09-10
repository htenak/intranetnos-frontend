import React from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilPowerStandby, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatarUser from "./../../../assets/images/user.png";
import { useDispatch } from "react-redux";
import { logout } from "src/store";

const AppHeaderDropdown = () => {
  const dispatch = useDispatch();

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatarUser} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="py-2" placement="bottom-end">
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Mi perfil
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(logout())}
          className="text-danger"
        >
          <CIcon icon={cilPowerStandby} className="me-2" />
          Cerrar sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
