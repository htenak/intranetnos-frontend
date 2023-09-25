import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

import { useDispatch, useSelector } from "react-redux";
import { logout } from "src/store";
import { intranetAvatarApi } from "src/api";

import imgUser from "./../../../assets/images/user.png";

const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  const { filename } = useSelector((state) => state.auth?.user);

  const [myPhoto, setMyPhoto] = useState(imgUser);

  useEffect(() => {
    if (filename !== null) {
      setMyPhoto(`${intranetAvatarApi}/${filename}`);
    } else {
      setMyPhoto(imgUser);
    }
  }, [filename]);

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={myPhoto} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="py-2" placement="bottom-end">
        <Link
          to="/profile"
          className="px-3"
          style={{ textDecoration: "none", color: "green" }}
        >
          <CIcon icon={cilUser} className="me-2" />
          Mi perfil
        </Link>
        <CDropdownDivider />
        <CDropdownItem
          role="button"
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
