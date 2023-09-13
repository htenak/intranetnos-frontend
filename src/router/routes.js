import React from "react";
import { ROLE_ADMIN } from "src/constants";

const Dashboard = React.lazy(() =>
  import("../components/pages/dashboard/Dashboard")
);
const NotFound = React.lazy(() => import("../components/pages/404/NotFound"));
const Profile = React.lazy(() => import("../components/pages/profile/Profile"));
const Roles = React.lazy(() => import("../components/pages/roles/Roles"));

const routes = [
  // todos:
  { path: "/", exact: true, name: "Inicio" },
  { path: "/*", name: "Not Found", element: NotFound },
  { path: "/not-found", name: "Not Found", element: NotFound },
  { path: "/dashboard", name: "Menú principal", element: Dashboard },
  { path: "/profile", name: "Mi perfil", element: Profile },

  // admin:
  { path: "/roles", name: "Roles", element: Roles, roles: [ROLE_ADMIN] },

  // professor:

  // student:
];

export default routes;
