import React, { useState } from 'react'
import { AuthContext } from './AuthContext'



export const AuthProvider = ({ children }) => {

  const [authStatus, setAuthStatus] = useState('not-authenticated');
  const [onAutenticateAction, setOnAutenticateAction] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createNewAppointment, setcreateNewAppointment] = useState(false);
  const [name, setName] = useState("");
  const [errorRegister, setErrorRegister] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleOnAutenticate = (bool) => {
    setOnAutenticateAction(bool);
  }

  const handleRegister =  async (e, userData) => {
    e.preventDefault();
    setLoading(true)
    setErrorRegister("");
    try {
      const response = await fetch("https://react-mern-backend-tu-turno.up.railway.app/api/auth/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userData.name, email: userData.email, password: userData.password }),
      });
  
      if (!response.ok) {
        throw new Error(data.message || "Error en la creación del usuario");
      }
  
      const data = await response.json();
      //setAuthStatus('registered');
      localStorage.setItem("token", data.token);
      setAuthStatus('authenticated');
      setOnAutenticateAction(false);
      return data;
    } catch (error) {
      setErrorRegister(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://react-mern-backend-tu-turno.up.railway.app/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el login");
      }

      // Guardar token en localStorage o en el contexto
      localStorage.setItem("token", data.token);
      console.log(data);
      setAuthStatus('authenticated');
      setOnAutenticateAction(false);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewAppointment = (bool) => {
    setcreateNewAppointment(bool);
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("token"); // Borra el usuario guardado
    setAuthStatus("not-authenticated"); // Cambia el estado de autenticación
    setOnAutenticateAction(false); // Cambia el estado de autenticación
    setLoading(false);
  };

  const showLogin = () => {
    setOnAutenticateAction(true);
    setAuthStatus("not-authenticated");
  };


  return (
    <AuthContext.Provider value={{
      authStatus,
      setAuthStatus,
      handleOnAutenticate,
      onAutenticateAction,
      handleLogin,
      handleRegister,
      email,
      setEmail,
      password,
      setPassword,
      loading,
      error,
      handleCreateNewAppointment,
      createNewAppointment,
      name,
      setName,
      logout,
      showLogin
    }}>
      {children}
    </AuthContext.Provider>
  )
}
