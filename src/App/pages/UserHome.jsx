import React, { useContext } from 'react'
import { Header } from '../../components/Header'
import { AuthContext } from '../../context/AuthContext';

export const UserHome = () => {

  const { onAutenticateAction, authStatus, createNewAppointment, handleCreateNewAppointment } = useContext(AuthContext);

  return (
    <>
      <Header/>
      <div>UserHome</div>
      <button
       className='btn btn-primary'
       onClick={() => handleCreateNewAppointment(true)}
      >Crear nuevo turno</button>
    </>
   
  )
}
