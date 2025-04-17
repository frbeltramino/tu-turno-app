import { useContext, useState } from "react";
import { tuTurnoApi } from "../api";
import { AuthContext } from "../context/AuthContext";
import emailjs from '@emailjs/browser';
import { getEnvVariables } from "../helpers/getEnvVariables";
import { useAppointment } from "./useAppointment";
import { AppointmentsContext } from "../context/AppointmentsContext";
import Swal from 'sweetalert2';



export const useAuth = () => {
  
  const { error, setError, setUser, setAuthStatus, setOnAutenticateAction, setLoading, email, setEmail, otp, setOtp, loading, loadingGenerateCode, registerOtp, registerEmail, setLoadingGenerateCode, showToast, setLoadingRegisterCode, setIsRegisterCodeSent, setIsLoginCodeSent, setRegisterOtp, handleShowUserSettings } = useContext(AuthContext);
  
  const { VITE_SERVICE_ID, VITE_TEMPLATE_ID, VITE_PUBLIC_KEY } = getEnvVariables();

  const { handleCreateNewAppointment } = useContext(AppointmentsContext);

  // FUNCIONES PARA LOGIN DE USUARIO
  
  const startLogin = async( {email, password}) => {

    setLoading(true);

    try {
      const response = await tuTurnoApi.post("/auth", { email, password });
  
      const data = response.data;
  
      if (!data.ok) {
        throw new Error(data.message || "Error en el login");
      }
       // Guardar token en localStorage o en el contexto
       localStorage.setItem("token", data.token);
       localStorage.setItem("user", JSON.stringify(data.user));
       setUser(data.user);
       setAuthStatus('authenticated');
       setOnAutenticateAction(false);
       deleteOTP(email);
  
    } catch (error) {
      setError(error.response.data?.message || "Credenciales incorrectas");
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
      //setEmail(email);
  
      console.log(`🔹 OTP generado: ${generatedOtp}, Email: ${email}`);
  
      // 📌 Llamar directamente a la función en lugar de usar useEffect
      await enviarOTPAlServidor(generatedOtp, email);
    };
    
    const enviarOTPAlServidor = async (otp, email) => {
      try {
        const response = await tuTurnoApi.post("/auth/otp", { "otp": otp, "email": email });
    
        const data = response.data;
    
        if (!data.ok) {
          throw new Error(error.response.data?.message || "Error al generar el otp");
          
        }
        if (data.ok) {
          sendEmail(otp, email);
          setOtp(otp);
          setIsLoginCodeSent(true);
        }
        
      } catch (error) {
        setError(error.response.data?.message  || "Error al generar el otp");
        
      } finally {
        setLoadingGenerateCode(false);
      }
    };

    const sendEmail = (passcode, emailParam) => {
    
      emailjs
        .send(VITE_SERVICE_ID, VITE_TEMPLATE_ID, {passcode, email: emailParam}, {
          publicKey: VITE_PUBLIC_KEY,
        })
        .then(
          () => {
            showToast("El correo se envió con éxito.", "success");
          },
          (error) => {
            showToast("El correo no pudo ser enviado.", "error");
          },
        );
    };

    
  const deleteOTP = async (email) => {
    setOtp("");

    try {
      const response = await tuTurnoApi.delete(`/auth/deleteOTP`, {
        data: { email }  // <-- Enviamos el email en el body
      });

    } catch (error) {
      console.log(error.response.data?.message  || "Error al borrar el otp");
    }
  };
  
// FUNCIONES PARA REGISTRO DE USUARIO


  const startRegister = async ({ name, email, phone, password }) => {
    setLoading(true);

    try {
      const response = await tuTurnoApi.post("/auth/new", { name, email, phone, otpRegisterParam: password });

      const data = response.data;

      if (!data.ok) {
        throw new Error(error.response.data?.message || "Error en el Registro de usuario");
      }
      // Guardar token en localStorage o en el contexto
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      setAuthStatus('authenticated');
      setOnAutenticateAction(false);
      deleteRegisterOTP(email);

    } catch (error) {
      setError(error.response.data?.message || "Error en el Registro de usuario");
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

    console.log(`🔹 OTP generado: ${generatedOtp}, Email: ${email}`);

    // 📌 Llamar directamente a la función en lugar de usar useEffect
    await enviarOTPRegisterAlServidor(generatedOtp, email);
  };
  
  const enviarOTPRegisterAlServidor = async (otp, email) => {
    try {
      const response = await tuTurnoApi.post("/auth/registerOtp", { "otp": otp, "email": email });
  
      const data = response.data;
  
      if (!data.ok) {
        throw new Error(error.response.data.message || "Error al generar el otp");
        
      }
      if (data.ok) {
        sendEmail(otp, email);
        setIsRegisterCodeSent(true);
        setRegisterOtp(otp);
      }
      
    } catch (error) {
      setError(error.response.data?.message  || "Error al generar el otp de registro");
      
    } finally {
      setLoadingRegisterCode(false);
    }
  };

  const deleteRegisterOTP = async (email) => {
    setRegisterOtp("");
    try {
      const response = await tuTurnoApi.delete("/auth/deleteRegisterOtp", { 
        data: { email }  // <-- Enviamos el email en el body
      });


      const data = await response.json();


    } catch (error) {
      console.log(error.response.data?.message  || "Error al borrar el otp de registro");
    } finally {
      //setLoading(false);
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
  
    try {
      const response = await tuTurnoApi.put(`/auth/userUpdate/${_id}`, { name, phone });
  
      const data = response.data;
      
      showToast("Datos actualizados correctamente ✅", "success");
      setError("");
      localStorage.setItem("user", JSON.stringify(data.user));
  
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.msg || "Error al actualizar el usuario");
      Swal.fire('Error al actualizar el usuario', error.response?.data?.msg, 'error');
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
    updateUserData
  }
  
}
