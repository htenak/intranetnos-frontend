import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

import routes from "../router/routes";
import { useSelector } from "react-redux";

import AppFooter from "./layout/footer/AppFooter";
import AppHeader from "./layout/header/AppHeader";
import AppSidebar from "./layout/sidebar/AppSidebar";

import { FloatButton } from "antd";
import { FAIcon } from "src/assets/icon/FAIcon";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const DefaultLayout = () => {
  const { user } = useSelector((state) => state.auth);

  const [up, setUp] = useState(false);

  const onClickUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.onscroll = () => {
    if (window.scrollY > 50) {
      setUp(true);
    } else {
      setUp(false);
    }
  };

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1">
          <CContainer style={{ maxWidth: "none" }}>
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
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </Suspense>
          </CContainer>
        </div>
        {up && (
          <FloatButton
            type="default"
            icon={<FAIcon icon={faArrowUp} />}
            style={{ right: 25, bottom: 25 }}
            onClick={onClickUp}
          />
        )}
      </div>
      <AppFooter />
    </div>
  );
};

export default DefaultLayout;
