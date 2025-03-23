import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import emailjs from '@emailjs/browser';
import { ToastContext } from './ToastContext';
import { getEnvVariables } from '../helpers/getEnvVariables';



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
  const [otp, setOtp] = useState('');
  const [newAppointmentCreated, setNewAppointmentCreated] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]);
  const [user, setUser] = useState({});
  const { showToast } = useContext(ToastContext);
  const [loadingGenerateCode, setLoadingGenerateCode] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [userAppoinmentsLoading, setUserAppoinmentsLoading] = useState(false);
  const [loadingRegisterCode, setLoadingRegisterCode] = useState(false);
  const [isRegisterCodeSent, setIsRegisterCodeSent] = useState(false);
  const [isLoginCodeSent, setIsLoginCodeSent] = useState(false);
  const [registerOtp, setRegisterOtp] = useState("");


  const handleOnAutenticate = (bool) => {
    setOnAutenticateAction(bool);
  }

  const handleCreateNewAppointment = (bool) => {
    setcreateNewAppointment(bool);
  };


  const getUserAppointments = async (user) => {
    return[];
  };

  
  return (
    <AuthContext.Provider value={{
      authStatus,
      setAuthStatus,
      handleOnAutenticate,
      onAutenticateAction,
      email,
      setEmail,
      password,
      setPassword,
      loading,
      error,
      setError,
      handleCreateNewAppointment,
      createNewAppointment,
      name,
      setName,
      newAppointmentCreated,
      userAppointments,
      loadingGenerateCode, 
      loadingLogin,
      userAppoinmentsLoading,
      setUser,
      setOnAutenticateAction,
      getUserAppointments,
      setLoading,
      setNewAppointmentCreated,
      setLoadingGenerateCode,
      otp,
      setOtp,
      showToast,
      loadingRegisterCode,
      setLoadingRegisterCode,
      isRegisterCodeSent,
      setIsRegisterCodeSent,
      isLoginCodeSent,
      setIsLoginCodeSent,
      setRegisterOtp
    }}>
      {children}
    </AuthContext.Provider>
  )
}
