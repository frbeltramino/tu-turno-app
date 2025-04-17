import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { ModalCommon } from '../../components/ModalCommon';
import { AuthContext } from '../../context/AuthContext';
import { ProfessionalsAndServicesContext } from '../../context/ProfessionalsAndServicesContext';
import { capitalize } from '../../utils/commonUtilities.js'
import { AppointmentList } from '../../components/AppointmentList .jsx';
import { useAppointment } from '../../hooks/useAppointment.js';
import { AppointmentsContext } from '../../context/AppointmentsContext';
import { formatDate } from '../../utils/commonUtilities.js';

export const UserHome = () => {

  const { onAutenticateAction, authStatus } = useContext(AuthContext);
  const { userAppointments, getUserAppointments, createNewAppointment, collectNewAppointmentData, cancelAppointment } = useAppointment();
  const [modalOpen, setModalOpen] = useState(false);
  const [newAppointmentData, setNewAppointmentData] = useState(null);
  const [userData, setUserData] = useState(null);
  const { handleCreateNewAppointment } = useContext(AppointmentsContext);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

   
  
   const { handleOnAutenticate} = useContext(AuthContext)

   const onSubmitAppointment = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const inputParamsUser = {
      userName: userData.name,
      userEmail: userData.email,
      userId: userData._id,
      userPhone: userData.phone,
    }
    collectNewAppointmentData(inputParamsUser, newAppointmentData);
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
        const userData = JSON.parse(localStorage.getItem("user"));
        setUserData(userData);
        getUserAppointments(userData._id);
      }
    }
  }, [authStatus]); // Se ejecuta cada vez que `authStatus` cambia

  const onClickBtnNewAppointment = () => {
    handleCreateNewAppointment(true);
  }

  const handleDeleteAppointment = (appointment) => {
    setAppointmentToCancel(appointment);
    setCancelModalOpen(true);
  };

  const confirmCancelAppointment = () => {
    if (appointmentToCancel) {
      cancelAppointment(appointmentToCancel._id);
      setCancelModalOpen(false);
      setAppointmentToCancel(null);
    }
  };


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
        <AppointmentList appointments={userAppointments} onCancel={(appointment) => handleDeleteAppointment(appointment)} onCreate={ onClickBtnNewAppointment } />
        
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
        <ModalCommon isOpen={cancelModalOpen} onClose={() => setCancelModalOpen(false)}>
          {appointmentToCancel && (
            <div>
              <h5 className="fw-bold text-center mb-3">¿Querés cancelar este turno?</h5>

              <div className="mb-2">
                <h6 className="card-title mb-1 fs-6">{appointmentToCancel.service_name}</h6>
                <p className="mb-1 small">
                  <strong>👨‍⚕️ Profesional:</strong> {appointmentToCancel.professional_name}
                </p>
                <p className="mb-1 small">
                  <strong>📆 Fecha:</strong> {appointmentToCancel.day} {formatDate(appointmentToCancel.date)}
                </p>
                <p className="mb-1 small">
                  <strong>⏰ Hora:</strong> {appointmentToCancel.start_hour} hs.
                </p>
              </div>

              <div className="modal-footer d-flex justify-content-center gap-3 mt-4">
                <button className="btn btn-outline-secondary px-4" onClick={() => setCancelModalOpen(false)}>
                  Cancelar
                </button>
                <button className="btn btn-danger px-4" onClick={confirmCancelAppointment}>
                  Sí, cancelar turno
                </button>
              </div>
            </div>
          )}
        </ModalCommon>
      </div>
    </>

  )
}
