import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { checkAuthToken } from "src/store";

const AppContent = React.lazy(() => import("../components/AppContent"));
const Login = React.lazy(() => import("../auth/pages/login/Login"));

const AppRouter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    // verifica el token
    dispatch(checkAuthToken());

    // redirecciona a la ruta raíz si no se autenticó
    if (status === "not-authenticated") {
      navigate("/", { replace: true });
    }
  }, [status]);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <>
      {status === "not-authenticated" ? (
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
