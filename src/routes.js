import React from "react";

const Dashboard = React.lazy(() =>
  import("./components/pages/dashboard/Dashboard")
);

const Roles = React.lazy(() => import("./components/pages/roles/Roles"));

const routes = [
  { path: "/", exact: true, name: "Inicio" },
  { path: "/dashboard", name: "Menú Principal", element: Dashboard },
  { path: "/roles", name: "Roles", element: Roles },
];

export default routes;
