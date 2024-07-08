import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import "./App.css";
import Layout from "../Layout/Layout";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("../../pages/TrackerPage/TrackerPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={
              <RestrictedRoute
                redirectTo="/signin"
                component={<SignUpPage />}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<SignInPage />}
              />
            }
          />
          <Route
            path="/tracker"
            element={
              <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
