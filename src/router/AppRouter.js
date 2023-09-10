import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppContent = React.lazy(() => import("../components/AppContent"));
const Login = React.lazy(() => import("../auth/pages/login/Login"));

const AppRouter = () => {
  const navigate = useNavigate();

  const authStatus = "not-authenticated";

  // useEffect(() => {
  //   if (authStatus === "not-authenticated") {
  //     navigate("/", { replace: true });
  //   }
  // }, [authStatus, navigate]);

  return (
    <>
      {authStatus === "not-authenticated" ? (
        // si no hay token redirige al login
        <Login />
      ) : (
        // si hay token accede al contenido
        <AppContent />
      )}
    </>
  );
};

export default AppRouter;
