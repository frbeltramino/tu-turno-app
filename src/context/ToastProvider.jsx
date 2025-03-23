import React, { useEffect, useState } from 'react'
import { ToastContext } from './ToastContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const ToastProvider = ({ children }) => {

  const showToast = (message, type = "success") => {
    if (type === "success") toast.success(message);
    if (type === "error") toast.error(message);
    if (type === "info") toast.info(message);
    if (type === "warning") toast.warn(message);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
    {children}
    <ToastContainer 
      position="top-right"
      autoClose={3000} 
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />
  </ToastContext.Provider>
  )

}