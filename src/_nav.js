import React from "react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { faCoffee, faUser } from "@fortawesome/free-solid-svg-icons";
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
    icon: <FAIcon customClass="icon nav-icon" icon={faUser} />,
  },
  {
    component: CNavItem,
    name: "Página de Inicio",
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
    icon: <FAIcon customClass="icon nav-icon" icon={faCoffee} />,
    items: [
      {
        component: CNavItem,
        name: "Roles",
        to: "/",
      },
      {
        component: CNavItem,
        name: "Administradores",
        to: "/",
      },
      {
        component: CNavItem,
        name: "Profesores",
        to: "/",
      },
      {
        component: CNavItem,
        name: "Estudiantes",
        to: "/",
      },
      {
        component: CNavItem,
        name: "Todos",
        to: "/",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Carreras",
    items: [
      {
        component: CNavItem,
        name: "Carreras",
        to: "/",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Notifications",
    items: [
      {
        component: CNavItem,
        name: "Alerts",
        to: "/notifications/alerts",
      },
      {
        component: CNavItem,
        name: "Badges",
        to: "/notifications/badges",
      },
      {
        component: CNavItem,
        name: "Modal",
        to: "/notifications/modals",
      },
      {
        component: CNavItem,
        name: "Toasts",
        to: "/notifications/toasts",
      },
    ],
  },

  {
    component: CNavItem,
    name: "Cerrar sesión",
    to: "/",
  },
];

export default _nav;
