import React, { Component, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";

import "dayjs/locale/es";
import "react-toastify/dist/ReactToastify.css";
import "react-data-grid/lib/styles.css";
import "./scss/style.scss";
import "./index.css";

import AppRouter from "./router/AppRouter";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <AppRouter />
          </Suspense>
        </BrowserRouter>
        <ToastContainer
          theme="colored"
          hideProgressBar
          position="top-center"
          autoClose={1000}
          transition={Flip}
        />
      </>
    );
  }
}

export default App;
