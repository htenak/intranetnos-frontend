import React from "react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import {
  faBook,
  faBookOpen,
  faBookReader,
  faCalendarAlt,
  faChalkboardTeacher,
  faCoffee,
  faCubes,
  faGraduationCap,
  faKey,
  faPowerOff,
  faProjectDiagram,
  faRestroom,
  faUserCircle,
  faUserCog,
  faUserGraduate,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "./assets/icon/FAIcon";
import Logout from "./auth/pages/logout/Logout";

import { ROLE_ADMIN, ROLE_PROFESSOR, ROLE_STUDENT } from "./constants";

const _nav = [
  // todos:
  {
    component: CNavTitle,
    name: "Inicio",
  },
  {
    component: CNavItem,
    name: "Menú principal",
    to: "/dashboard",
    icon: <FAIcon customClass="icon nav-icon" icon={faCoffee} />,
  },
  {
    component: CNavItem,
    name: "Mi perfil",
    to: "/profile",
    icon: <FAIcon customClass="icon nav-icon" icon={faUserCircle} />,
  },

  // admins:
  {
    roles: [ROLE_ADMIN],
    component: CNavTitle,
    name: "Mantenedores",
  },
  {
    roles: [ROLE_ADMIN],
    component: CNavGroup,
    name: "Usuarios",
    icon: <FAIcon customClass="icon nav-icon" icon={faUsers} />,
    items: [
      {
        component: CNavItem,
        name: "Roles",
        to: "/roles",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faKey} />,
      },
      {
        component: CNavItem,
        name: "Administradores",
        to: "/",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faUserCog} />,
      },
      {
        component: CNavItem,
        name: "Profesores",
        to: "/",
        icon: (
          <FAIcon customClass="icon nav-icon-sub" icon={faChalkboardTeacher} />
        ),
      },
      {
        component: CNavItem,
        name: "Estudiantes",
        to: "/",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faUserGraduate} />,
      },
    ],
  },
  {
    roles: [ROLE_ADMIN],
    component: CNavGroup,
    name: "Formación",
    icon: <FAIcon customClass="icon nav-icon" icon={faBook} />,
    items: [
      {
        component: CNavItem,
        name: "Carreras",
        to: "/",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faGraduationCap} />,
      },
      {
        component: CNavItem,
        name: "Ciclos",
        to: "/",
        icon: (
          <FAIcon customClass="icon nav-icon-sub" icon={faProjectDiagram} />
        ),
      },
      {
        component: CNavItem,
        name: "Cursos",
        to: "/",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faBookReader} />,
      },
    ],
  },
  {
    roles: [ROLE_ADMIN],
    component: CNavGroup,
    name: "Aulas",
    icon: <FAIcon customClass="icon nav-icon" icon={faCubes} />,
    items: [
      {
        component: CNavItem,
        name: "Clases",
        to: "/",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faBookOpen} />,
      },
      {
        component: CNavItem,
        name: "Horarios",
        to: "/",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faCalendarAlt} />,
      },
      {
        component: CNavItem,
        name: "Matricula",
        to: "/",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faRestroom} />,
      },
    ],
  },

  // todos:
  {
    component: CNavTitle,
    name: "Opciones",
  },
  {
    component: Logout,
    name: "Cerrar sesión",
    icon: <FAIcon customClass="icon nav-icon text-danger" icon={faPowerOff} />,
  },
];

export default _nav;
