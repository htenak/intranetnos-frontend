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

const _nav = [
  {
    component: CNavTitle,
    name: "Inicio",
  },
  {
    component: CNavItem,
    name: "Mi perfil",
    to: "/",
    icon: <FAIcon customClass="icon nav-icon" icon={faUserCircle} />,
  },
  {
    component: CNavItem,
    name: "Menú principal",
    to: "/",
    icon: <FAIcon customClass="icon nav-icon" icon={faCoffee} />,
  },
  {
    component: CNavTitle,
    name: "Mantenedores",
  },
  {
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
  {
    component: CNavTitle,
    name: "Opciones",
  },
  {
    component: CNavItem,
    name: "Cerrar sesión",
    to: "/",
    icon: <FAIcon customClass="icon nav-icon text-danger" icon={faPowerOff} />,
  },
];

export default _nav;
