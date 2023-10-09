import React from "react";
import { ROLE_ADMIN } from "src/constants";

const Dashboard = React.lazy(() =>
  import("../components/pages/dashboard/Dashboard")
);
const NotFound = React.lazy(() => import("../components/pages/404/NotFound"));
const Profile = React.lazy(() => import("../components/pages/profile/Profile"));
const Users = React.lazy(() => import("../components/pages/users/Users"));
const Students = React.lazy(() =>
  import("../components/pages/students/Students")
);
const Professors = React.lazy(() =>
  import("../components/pages/professors/Professors")
);
const Careers = React.lazy(() => import("../components/pages/careers/Careers"));
const Cycles = React.lazy(() => import("../components/pages/cycles/Cycles"));
const Courses = React.lazy(() => import("../components/pages/courses/Courses"));
const Classes = React.lazy(() => import("../components/pages/classes/Classes"));

const routes = [
  // todos:
  { path: "/", exact: true, name: "Inicio" },
  { path: "/*", name: "Página no encontrada", element: NotFound },
  { path: "/not-found", name: "Página no encontrada", element: NotFound },
  { path: "/dashboard", name: "Menú principal", element: Dashboard },
  { path: "/profile", name: "Mi perfil", element: Profile },

  // admin:
  { path: "/users", name: "Usuarios", element: Users, roles: [ROLE_ADMIN] },
  {
    path: "/students",
    name: "Estudiantes",
    element: Students,
    roles: [ROLE_ADMIN],
  },
  {
    path: "/professors",
    name: "Profesores",
    element: Professors,
    roles: [ROLE_ADMIN],
  },
  {
    path: "/careers",
    name: "Carreras",
    element: Careers,
    roles: [ROLE_ADMIN],
  },
  {
    path: "/cycles",
    name: "Ciclos",
    element: Cycles,
    roles: [ROLE_ADMIN],
  },
  {
    path: "/courses",
    name: "Cursos",
    element: Courses,
    roles: [ROLE_ADMIN],
  },
  {
    path: "/classes",
    name: "Clases",
    element: Classes,
    roles: [ROLE_ADMIN],
  },

  // professor:

  // student:
];

export default routes;
