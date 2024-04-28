import { Routes, Route } from "react-router-dom";
import Unauthorized from "../pages/unathorized";
import PrivateRoutes from "./private-routes/private-routes";
import DashboardRoutes from "./dashboard-routes/dashboard-routes";
import PublicRoutes from "./public-routes/public-routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/unAuthorize"
        element={
          <PublicRoutes>
            <Unauthorized />
          </PublicRoutes>
        }
      />

      <Route
        path="/*"
        element={
          <PrivateRoutes>
            <DashboardRoutes />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};
