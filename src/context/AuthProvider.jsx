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
  const [name, setName] = useState("");
  const [errorRegister, setErrorRegister] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [otp, setOtp] = useState('');
  
  const [user, setUser] = useState({});
  const { showToast } = useContext(ToastContext);
  const [loadingGenerateCode, setLoadingGenerateCode] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
 
  const [loadingRegisterCode, setLoadingRegisterCode] = useState(false);
  const [isRegisterCodeSent, setIsRegisterCodeSent] = useState(false);
  const [isLoginCodeSent, setIsLoginCodeSent] = useState(false);
  const [registerOtp, setRegisterOtp] = useState("");
  const [showUserSettings, setShowUserSettings] = useState(false);


  const handleOnAutenticate = (bool) => {
    setOnAutenticateAction(bool);
  }

  const handleShowUserSettings = (bool) => {
    setShowUserSettings(bool);
  }

 

  
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
      name,
      setName,
     
      loadingGenerateCode, 
      loadingLogin,
      
      setUser,
      setOnAutenticateAction,
     
      setLoading,
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
      setRegisterOtp,
      showUserSettings,
      setShowUserSettings,
      handleShowUserSettings
    }}>
      {children}
    </AuthContext.Provider>
  )
}
