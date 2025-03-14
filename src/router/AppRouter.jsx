import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router"
import { App } from "../App"
import { UserHome } from "../App";
import { LoginPage } from "../auth";
import { AuthContext } from "../context/AuthContext";
import { LoaderScreen } from "../components/LoaderScreen";


export const AppRouter = () => {
  const { onAutenticateAction, authStatus, createNewAppointment, loading } = useContext(AuthContext);

  return (
    <>
      {/* Loader mientras carga */}
      <LoaderScreen isVisible={loading} />

      <Routes>
        {
          (!onAutenticateAction && authStatus === "not-authenticated") || (createNewAppointment && authStatus === "authenticated") 
          ? <Route path="/*" element={<App />} />
          : authStatus === "not-authenticated" 
          ? <Route path="/auth/*" element={<LoginPage />} />
          : <Route path="/user/*" element={<UserHome />} />
        }

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to={onAutenticateAction ? "/auth" : "/user"} replace />} />
      </Routes>
    </>
  );
};
