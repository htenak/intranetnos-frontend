import React from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilLockLocked } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "./../../../assets/images/avatars/8.jpg";
import { FAIcon } from "src/assets/icon/FAIcon";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#">
          <FAIcon customClass="icon" icon={faUser} />
          <span>Mi perfil</span>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" className="text-danger">
          <CIcon icon={cilLockLocked} className="me-2" />
          Cerrar sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};
