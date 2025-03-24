import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router"
import { App } from "../App"
import { UserHome } from "../App";
import { LoginPage } from "../auth";
import { AuthContext } from "../context/AuthContext";
import { LoaderScreen } from "../components/LoaderScreen";
import { useAuth } from '../hooks/useAuth';
import { use } from "react";


export const AppRouter = () => {
  const { onAutenticateAction, authStatus, createNewAppointment, loading, newAppointmentCreated } = useContext(AuthContext);
  const { checkAuthToken } = useAuth();
 
  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <>
      {/* Loader mientras carga */}
      <LoaderScreen isVisible={loading} />

      <Routes>
        {
          ( (!onAutenticateAction && authStatus === "not-authenticated") || (createNewAppointment && authStatus === "authenticated") ) && (!newAppointmentCreated)
          ? <Route path="/*" element={<App />} />
          : (authStatus === "not-authenticated") && (!newAppointmentCreated)
          ? <Route path="/auth/*" element={<LoginPage />} />
          : <Route path="/user/*" element={<UserHome />} />
        }

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to={onAutenticateAction ? "/auth" : "/user"} replace />} />
      </Routes>
    </>
  );
};
