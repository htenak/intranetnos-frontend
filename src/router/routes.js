import React from "react";

const Dashboard = React.lazy(() =>
  import("../components/pages/dashboard/Dashboard")
);

const Roles = React.lazy(() => import("../components/pages/roles/Roles"));
const NotFound = React.lazy(() => import("../components/pages/404/NotFound"));

const routes = [
  { path: "/", exact: true, name: "Inicio" },
  { path: "/dashboard", name: "Menú Principal", element: Dashboard },
  { path: "/roles", name: "Roles", element: Roles },
  { path: "/*", name: "Not Found", element: NotFound },
];

export default routes;
