import { Navigate, Outlet } from 'react-router-dom';
export const PrivateRoute = () => {
    const token = sessionStorage.getItem("accessToken");

  return token ? <Outlet /> : <Navigate to="/" replace />;
};
