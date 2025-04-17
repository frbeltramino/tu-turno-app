import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { App, UserHome, UserSettings } from "../App";
import { LoginPage } from "../auth";
import { AuthContext } from "../context/AuthContext";
import { LoaderScreen } from "../components/LoaderScreen";
import { useAuth } from '../hooks/useAuth';
import { AppointmentsContext } from "../context/AppointmentsContext";


export const AppRouter = () => {
  const { onAutenticateAction, authStatus, loading, showUserSettings } = useContext(AuthContext);
  const { checkAuthToken } = useAuth();
  
  const { newAppointmentCreated, createNewAppointmentFlag } = useContext(AppointmentsContext);
 
  useEffect(() => {
    checkAuthToken();
  }, []);

  // Lógica de ruteo expresiva
  const isAuth = authStatus === "authenticated";
  const isNotAuth = authStatus === "not-authenticated";
  const creatingAppointment = createNewAppointmentFlag && isAuth;
  
  return (
    <>
      <LoaderScreen isVisible={loading} />

      <Routes>
        

       

        {/* Mostrar flujo de creación de turno si corresponde */}
     
        {((!onAutenticateAction && isNotAuth) || creatingAppointment) && !newAppointmentCreated && (
          <Route path="/*" element={<App />} />
        )}

        {/* Login */}
        {isNotAuth && !newAppointmentCreated && (
          <Route path="/auth/*" element={<LoginPage />} />
        )}

        {/* Usuario autenticado */}
        {isAuth && !createNewAppointmentFlag && !showUserSettings && (
        <Route path="/user/*" element={<UserHome />} />
        )}

         {/* Mostrar la pantalla de configuración de usuario si showUserSettingsFlag es true */}
         {isAuth && showUserSettings && !createNewAppointmentFlag && (
          
          <Route path="/user/" element={<UserSettings />} />
          )}


        {/* Redirección por defecto */}
        <Route
          path="*"
          element={
            <Navigate
              to={onAutenticateAction || isNotAuth
                ? "/auth"
                : createNewAppointmentFlag
                  ? "/"
                  : "/user"
              }
              replace
            />
          }
        />
      </Routes>
    </>
  );
};