import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { ModalCommon } from '../../components/ModalCommon';
import { AuthContext } from '../../context/AuthContext';
import { ProfessionalsAndServicesContext } from '../../context/ProfessionalsAndServicesContext';
import { capitalize } from '../../utils/commonUtilities.js'
import { AppointmentList } from '../../components/AppointmentList .jsx';
import { ToastContext } from '../../context/ToastContext.jsx';

export const UserHome = () => {

  const { onAutenticateAction, authStatus, createNewAppointment, handleCreateNewAppointment, userAppointments, getUserAppointments } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [newAppointmentData, setNewAppointmentData] = useState(null);
  const [userData, setUserData] = useState(null);
  const { showToast } = useContext(ToastContext);

   
  
   const { handleOnAutenticate} = useContext(AuthContext)

   const onSubmitAppointment = () => {
    console.log("Reservar turno");
    showToast("El turno se reservó correctamente.", "success");
    localStorage.removeItem("newAppointment");
    setModalOpen(false);
  }

  const onCloseAppointmentModal = () => {
    setModalOpen(false);
    localStorage.removeItem("newAppointment");
  }

  useEffect(() => {
    // Verifica si el usuario está autenticado y si hay datos en localStorage
    if (authStatus === "authenticated") {
      const appointmentStoredData = localStorage.getItem("newAppointment");
      const userStoredData = localStorage.getItem("user")
      if (appointmentStoredData) {
        setNewAppointmentData(JSON.parse(appointmentStoredData));
        setModalOpen(true); // Abre el modal
      }
      if (userStoredData){
        setUserData(JSON.parse(userStoredData));
        getUserAppointments(userStoredData);
      }
    }
  }, [authStatus]); // Se ejecuta cada vez que `authStatus` cambia

  const onClickBtnNewAppointment = () => {
    //handleNewAppointmentCreated(false);
    handleCreateNewAppointment(true);
  }


  return (
    <>
      {/* Header */}
      <Header />
      <div className="container mt-4">
        

        {/* Mensaje de Bienvenida */}
        {userData && (
          <h2 className="text-center my-3">Hola, {userData.name} 👋</h2>
        )}

        {/* Lista de Turnos */}
        <AppointmentList appointments={userAppointments} />
        
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <ModalCommon isOpen={modalOpen} onClose={onCloseAppointmentModal}>
          {
            newAppointmentData != null &&
            <div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: "20px" }}>📝 Confirmación de turno</span>
                </div>

              </div>
              <div className='mt-2'>
                <p><strong>Servicio:</strong> {newAppointmentData.serviceName}</p>
                <p><strong>Profesional:</strong> {newAppointmentData.professionalName}</p>
                <p><strong>Fecha:</strong> {newAppointmentData.date.day + " " + newAppointmentData.date.dayNumber + " de " + capitalize(newAppointmentData.date.month)}</p>
                <p><strong>Hora:</strong> {newAppointmentData.hour.hour + " hs."}</p>

              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={() => onSubmitAppointment()}>Reservar turno</button>
              </div>
            </div>
          }
        </ModalCommon>
      </div>
    </>

  )
}
