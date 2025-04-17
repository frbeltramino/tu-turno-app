import React, { useContext, useEffect, useState } from 'react'
import { AppointmentsContext } from './AppointmentsContext'

export const AppointmentsProvider = ({ children }) => {

  const [appointments, setAppointments] = useState([]);
  const [createNewAppointmentFlag, setcreateNewAppointmentFlag] = useState(false);
  const [newAppointmentCreated, setNewAppointmentCreated] = useState(false);

  const handleCreateNewAppointment = (bool) => {
    setcreateNewAppointmentFlag(bool);
  };

  return (
    <AppointmentsContext.Provider value={{
      appointments,
      setAppointments,
      createNewAppointmentFlag,
      handleCreateNewAppointment,
      newAppointmentCreated,
      setNewAppointmentCreated
    }}>
      {children}
    </AppointmentsContext.Provider>
  )
}