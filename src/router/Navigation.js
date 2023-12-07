import React from "react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import {
  faBook,
  faBookReader,
  faCalendarAlt,
  faChalkboard,
  faChalkboardTeacher,
  faCoffee,
  faGraduationCap,
  faPowerOff,
  faProjectDiagram,
  faServer,
  faUserCircle,
  faUserFriends,
  faUserGraduate,
  faUsers,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FAIcon } from "src/assets/icon/FAIcon";
import Logout from "../auth/pages/logout/Logout";

import {
  ROLE_ADMIN,
  ROLE_PROFESSOR,
  ROLE_STUDENT,
  ROLE_USER,
} from "../constants";

const navigation = [
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
    roles: [ROLE_ADMIN, ROLE_USER],
    component: CNavTitle,
    name: "Mantenedores",
  },
  {
    roles: [ROLE_ADMIN, ROLE_USER],
    component: CNavGroup,
    name: "Usuarios",
    icon: <FAIcon customClass="icon nav-icon" icon={faUsers} />,
    items: [
      {
        component: CNavItem,
        name: "Usuarios",
        to: "/admin/users/users",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faUserFriends} />,
      },
      {
        component: CNavItem,
        name: "Profesores",
        to: "/admin/users/professors",
        icon: (
          <FAIcon customClass="icon nav-icon-sub" icon={faChalkboardTeacher} />
        ),
      },
      {
        component: CNavItem,
        name: "Estudiantes",
        to: "/admin/users/students",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faUserGraduate} />,
      },
    ],
  },
  {
    roles: [ROLE_ADMIN, ROLE_USER],
    component: CNavGroup,
    name: "P. Academico",
    icon: <FAIcon customClass="icon nav-icon" icon={faBook} />,
    items: [
      {
        component: CNavItem,
        name: "Carreras",
        to: "/admin/academic/careers",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faGraduationCap} />,
      },
      {
        component: CNavItem,
        name: "Ciclos",
        to: "/admin/academic/cycles",
        icon: (
          <FAIcon customClass="icon nav-icon-sub" icon={faProjectDiagram} />
        ),
      },
      {
        component: CNavItem,
        name: "Cursos",
        to: "/admin/academic/courses",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faBookReader} />,
      },
      {
        component: CNavItem,
        name: "Clases",
        to: "/admin/academic/classes",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faChalkboard} />,
      },
      {
        component: CNavItem,
        name: "Horarios",
        to: "/admin/academic/schedules",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faCalendarAlt} />,
      },
    ],
  },
  {
    roles: [ROLE_ADMIN, ROLE_USER],
    component: CNavTitle,
    name: "Procesos",
  },
  {
    roles: [ROLE_ADMIN, ROLE_USER],
    component: CNavGroup,
    name: "Gestionar datos",
    icon: <FAIcon customClass="icon nav-icon" icon={faServer} />,
    items: [],
  },

  // professors y students:
  {
    roles: [ROLE_PROFESSOR, ROLE_STUDENT, ROLE_USER],
    component: CNavTitle,
    name: "Menú",
  },

  // professors:
  {
    roles: [ROLE_PROFESSOR, ROLE_USER],
    component: CNavItem,
    name: "Clases",
    to: "/professor/classes",
    icon: <FAIcon customClass="icon nav-icon" icon={faChalkboardTeacher} />,
  },
  {
    roles: [ROLE_PROFESSOR, ROLE_USER],
    component: CNavItem,
    name: "Actividades",
    to: "/professor/activities",
    icon: <FAIcon customClass="icon nav-icon" icon={faWindowRestore} />,
  },
  {
    roles: [ROLE_PROFESSOR, ROLE_USER],
    component: CNavItem,
    name: "Alumnos",
    to: "/professor/students",
    icon: <FAIcon customClass="icon nav-icon" icon={faUserGraduate} />,
  },
  {
    roles: [ROLE_PROFESSOR, ROLE_USER],
    component: CNavGroup,
    name: "Horarios",
    icon: <FAIcon customClass="icon nav-icon" icon={faCalendarAlt} />,
    items: [
      {
        component: CNavItem,
        name: "Tus horarios",
        to: "/professor/schedules/yours",
        icon: <FAIcon customClass="icon nav-icon-sub" icon={faCalendarAlt} />,
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

export default navigation;
