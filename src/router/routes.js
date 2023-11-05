import React from "react";
import { ROLE_ADMIN, ROLE_PROFESSOR } from "src/constants";

const Dashboard = React.lazy(() =>
  import("../components/pages/dashboard/Dashboard")
);
const NotFound = React.lazy(() => import("../components/pages/404/NotFound"));
const Profile = React.lazy(() => import("../components/pages/profile/Profile"));
const Users = React.lazy(() => import("../components/pages/admin/users/Users"));
const Students = React.lazy(() =>
  import("../components/pages/admin/students/Students")
);
const Professors = React.lazy(() =>
  import("../components/pages/admin/professors/Professors")
);
const Careers = React.lazy(() =>
  import("../components/pages/admin/careers/Careers")
);
const Cycles = React.lazy(() =>
  import("../components/pages/admin/cycles/Cycles")
);
const Courses = React.lazy(() =>
  import("../components/pages/admin/courses/Courses")
);
const Classes = React.lazy(() =>
  import("../components/pages/admin/classes/Classes")
);
const Schedules = React.lazy(() =>
  import("../components/pages/admin/schedules/Schedules")
);
const PClasses = React.lazy(() =>
  import("../components/pages/professor/classes/PClasses")
);

const routes = [
  // todos:
  { path: "/", exact: true, name: "Inicio" },
  { path: "/*", name: "Página no encontrada", element: NotFound },
  { path: "/not-found", name: "Página restringida", element: NotFound },
  { path: "/dashboard", name: "Menú principal", element: Dashboard },
  { path: "/profile", name: "Mi perfil", element: Profile },

  // admin:
  {
    path: "admin/users",
    name: "Usuarios",
    element: Users,
    roles: [ROLE_ADMIN],
    exact: true,
  },
  {
    path: "admin/users/users",
    name: "Todos",
    element: Users,
    roles: [ROLE_ADMIN],
  },
  {
    path: "admin/users/students",
    name: "Estudiantes",
    element: Students,
    roles: [ROLE_ADMIN],
  },
  {
    path: "admin/users/professors",
    name: "Profesores",
    element: Professors,
    roles: [ROLE_ADMIN],
  },

  {
    path: "admin/academic",
    name: "P. Academico",
    element: Careers,
    roles: [ROLE_ADMIN],
    exact: true,
  },
  {
    path: "admin/academic/careers",
    name: "Carreras",
    element: Careers,
    roles: [ROLE_ADMIN],
  },
  {
    path: "admin/academic/cycles",
    name: "Ciclos",
    element: Cycles,
    roles: [ROLE_ADMIN],
  },
  {
    path: "admin/academic/courses",
    name: "Cursos",
    element: Courses,
    roles: [ROLE_ADMIN],
  },
  {
    path: "admin/academic/classes",
    name: "Clases",
    element: Classes,
    roles: [ROLE_ADMIN],
  },
  {
    path: "admin/academic/schedules",
    name: "Horarios",
    element: Schedules,
    roles: [ROLE_ADMIN],
  },

  // professor:
  {
    path: "/professor/classes",
    name: "Horarios",
    element: PClasses,
    roles: [ROLE_PROFESSOR],
  },

  // student:
];

export default routes;
