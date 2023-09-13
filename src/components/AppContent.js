import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

import AppFooter from "./layout/footer/AppFooter";
import AppHeader from "./layout/header/AppHeader";
import AppSidebar from "./layout/sidebar/AppSidebar";

// routes config
import routes from "../router/routes";
import { useSelector } from "react-redux";

const DefaultLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer xl>
            <Suspense fallback={<CSpinner style={{ color: "green" }} />}>
              <Routes>
                {routes.map((route, idx) => {
                  // verifica si hay el rol de usuario y si lo incluye
                  const isAllowed = route.roles
                    ? route.roles?.includes(user.role.name)
                    : true; //si no se mandó rol lo permite (true)

                  return (
                    route.element && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        element={
                          isAllowed ? (
                            <route.element />
                          ) : (
                            <Navigate to="/not-found" replace />
                          )
                        }
                      />
                    )
                  );
                })}
                <Route path="/" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </Suspense>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
