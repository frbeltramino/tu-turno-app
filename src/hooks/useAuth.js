import { useContext, useState } from "react";
import { tuTurnoApi } from "../api";
import { AuthContext } from "../context/AuthContext";
import emailjs from '@emailjs/browser';
import { getEnvVariables } from "../helpers/getEnvVariables";
import { useAppointment } from "./useAppointment";
import { AppointmentsContext } from "../context/AppointmentsContext";
import Swal from 'sweetalert2';
import { useTranslation } from "react-i18next";



export const useAuth = () => {
  
  const { error, setError, setUser, setAuthStatus, setOnAutenticateAction, setLoading, email, setEmail, otp, setOtp, loading, loadingGenerateCode, registerOtp, registerEmail, setLoadingGenerateCode, showToast, setLoadingRegisterCode, setIsRegisterCodeSent, setIsLoginCodeSent, setRegisterOtp, handleShowUserSettings } = useContext(AuthContext);
  
  const { VITE_SERVICE_ID, VITE_TEMPLATE_ID, VITE_PUBLIC_KEY } = getEnvVariables();

  const { handleCreateNewAppointment } = useContext(AppointmentsContext);

  const [settingsLoading, setSettingsLoading] = useState(false);

  const { t } = useTranslation();

  // FUNCIONES PARA LOGIN DE USUARIO
  
  const startLogin = async( {email, password}) => {

    setLoading(true);

    try {
      const response = await tuTurnoApi.post("/auth", { email, password });
  
      const data = response.data;
  
      if (!data.ok) {
        throw new Error(data.message || t("i18n.auth.002"));
      }
       // Guardar token en localStorage o en el contexto
       localStorage.setItem("token", data.token);
       localStorage.setItem("user", JSON.stringify(data.user));
       setUser(data.user);
       setAuthStatus('authenticated');
       setOnAutenticateAction(false);
       deleteOTP(email);
  
    } catch (error) {
      setError(error.response.data?.message || t("i18n.auth.001"));
      console.log(error);
      setTimeout(() => {
      setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  const startLogout = () => {
    setLoading(true);
    localStorage.clear();
    setAuthStatus("not-authenticated"); // Cambia el estado de autenticación
    setOnAutenticateAction(false); // Cambia el estado de autenticación
    handleCreateNewAppointment(false);//Flag para mostrar la pantalla de crear turno estando autenticado
    handleShowUserSettings(false);
    setIsRegisterCodeSent(false);
    setIsLoginCodeSent(false);
    setLoading(false);
  };

  const showLogin = () => {
    setOnAutenticateAction(true);
    setAuthStatus("not-authenticated");
  };

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    return newOtp;
  };

    const handleGenerateToken = async (email) => {
      setLoadingGenerateCode(true);
      setError("");
  
      const generatedOtp = generateOtp();
      
      await enviarOTPAlServidor(generatedOtp, email);
    };
    
    const enviarOTPAlServidor = async (otp, email) => {
      try {
        const response = await tuTurnoApi.post("/auth/otp", { "otp": otp, "email": email });
    
        const data = response.data;
    
        if (!data.ok) {
          throw new Error(error.response.data?.message || t("i18n.auth.004"));
          
        }
        if (data.ok) {
          sendEmail(otp, email);
          setOtp(otp);
          setIsLoginCodeSent(true);
        }
        
      } catch (error) {
        setError(error.response.data?.message  || t("i18n.auth.004"));
        
      } finally {
        setLoadingGenerateCode(false);
      }
    };

   const sendEmail = async (passcode, emailParam) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        { passcode, email: emailParam },
        { publicKey: import.meta.env.VITE_PUBLIC_KEY }
      );
      showToast(t("i18n.auth.005"), "success");
    } catch (error) {
      showToast(t("i18n.auth.006"), "error");
      deleteOTP(emailParam);
    }
  };

    
  const deleteOTP = async (email) => {
    setOtp("");

    try {
      const response = await tuTurnoApi.delete(`/auth/deleteOTP`, {
        data: { email } 
      });

    } catch (error) {
      console.log(error.response.data?.message  || t("i18n.auth.007"));
    }
  };
  
// FUNCIONES PARA REGISTRO DE USUARIO


  const startRegister = async ({ name, email, phone, password }) => {
    setLoading(true);

    try {
      const response = await tuTurnoApi.post("/auth/new", { name, email, phone, otpRegisterParam: password });

      const data = response.data;

      if (!data.ok) {
        throw new Error(error.response.data?.message || t("i18n.auth.003"));
      }
      // Guardar token en localStorage o en el contexto
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      setAuthStatus('authenticated');
      setOnAutenticateAction(false);
      deleteRegisterOTP(email);

    } catch (error) {
      setError(error.response.data?.message || t("i18n.auth.003"));
      console.log(error);
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  const handleGenerateTokenRegister = async (email) => {
    setLoadingRegisterCode(true);
    setError("");

    const generatedOtp = generateOtp();
    setEmail(email);

    await enviarOTPRegisterAlServidor(generatedOtp, email);
  };
  
  const enviarOTPRegisterAlServidor = async (otp, email) => {
    try {
      const response = await tuTurnoApi.post("/auth/registerOtp", { "otp": otp, "email": email });
  
      const data = response.data;
  
      if (!data.ok) {
        throw new Error(error.response.data.message || t("i18n.auth.004"));
        
      }
      if (data.ok) {
        sendEmail(otp, email);
        setIsRegisterCodeSent(true);
        setRegisterOtp(otp);
      }
      
    } catch (error) {
      setError(error.response.data?.message  || t("i18n.auth.008"));
      
    } finally {
      setLoadingRegisterCode(false);
    }
  };

  const deleteRegisterOTP = async (email) => {
    setRegisterOtp("");
    try {
      const response = await tuTurnoApi.delete("/auth/deleteRegisterOtp", { 
        data: { email }
      });
  
      const data = response.data;
      console.log("OTP eliminado:");
  
    } catch (error) {
      console.log(error.response?.data?.message || t("i18n.auth.009"));
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) { startLogout() }
    try {
      const { data } = await tuTurnoApi.get("/auth/renew");
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      console.log(error);
      localStorage.clear();
      startLogout();
    }
  };


  const updateUserData = async (userData) => {
    const { _id, name, phone } = userData;
    setSettingsLoading(true);
  
    try {
      const response = await tuTurnoApi.put(`/auth/userUpdate/${_id}`, { name, phone });
  
      const data = response.data;
      
      showToast(t("i18n.auth.010"), "success");
      setError("");
      localStorage.setItem("user", JSON.stringify(data.user));
  
      setSettingsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.msg || t("i18n.auth.011"));
      Swal.fire(t("i18n.auth.011"), error.response?.data?.msg, 'error');
      setSettingsLoading(false);
    }
  };


  return {
    startLogin,
    startRegister,
    startLogout,
    showLogin,
    handleGenerateToken,
    handleGenerateTokenRegister,
    checkAuthToken,
    updateUserData,
    settingsLoading
  }
  
}
