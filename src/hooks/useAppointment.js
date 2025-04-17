import { useContext, useEffect, useState } from "react";
import { tuTurnoApi } from "../api";
import { ToastContext } from '../context/ToastContext.jsx';
import Swal from 'sweetalert2';
import { AppointmentsContext } from "../context/AppointmentsContext.jsx";

export const useAppointment = () => {


  const [appointment, setAppointment] = useState({});
  const [day, setDay] = useState({});
  const [hour, setHour] = useState({});
  const [category, setCategory] = useState({});
  const [professional, setProfessional] = useState({});
  const [userAppointmentsLoading, setUserAppointmentsLoading] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]);
  const { showToast } = useContext(ToastContext);
  const [errorAppointment, setErrorAppointment] = useState("");
  

  const { handleCreateNewAppointment } = useContext(AppointmentsContext);
 


  const handleAppointment = (turn) => {
    setAppointment(turn);
  };

  const handleDay = (day) => {
    setDay(day);
  };

  const handleHour = (hour) => {
    setHour(hour);
  };
  
  const handleCategory = (category) => {
    setCategory(category);
  };

  const handleProfessional = (professional) => {
    setProfessional(professional);
  };

  const calculateEndHour = (startHour, durationInMinutes) => {
    const [hours, minutes] = startHour.split(':').map(Number);
    const startDate = new Date(0, 0, 0, hours, minutes);
    
    const endDate = new Date(startDate.getTime() + durationInMinutes * 60000);
    
    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
  
    return `${endHours}:${endMinutes}`;
  };

  const collectNewAppointmentData = (userData, appointmentData) => {
    const endHour = calculateEndHour(appointmentData.hour.hour, appointmentData.service.time_turns);

    const params = {
      "day": appointmentData.date.day,
      "start_hour":appointmentData.hour.hour,
      "end_hour": endHour,
      "date": appointmentData.date.date,
      "client_name": userData.userName,
      "client_phone": userData.userPhone,
      "client_email": userData.userEmail,
      "professional_id": appointmentData.professional._id,
      "duration": appointmentData.service.time_turns,
      "professional_name":appointmentData.professional.name,
      "client_id": userData.userId,
      "service_name": appointmentData.service.name
    }
    createNewAppointment(params);//llamar al servicio de crear un nuevo turno
  }


  const getUserAppointments = async (userId) => {
    setUserAppointmentsLoading(true);
    try {
      const response = await tuTurnoApi.get(`/appointments/${userId}`);
      const data = response.data;
      setUserAppointments(data.turnos);
      setErrorAppointment("");
      setUserAppointmentsLoading(false);
    } catch (error) {
      setUserAppointmentsLoading(false);
      setErrorAppointment(error.response.data?.message || "Error al obtener turnos");
      Swal.fire('Error al obtener turnos', error.response.data?.message, 'error');
    }
  };

  const createNewAppointment = async (appointment) => {
   
    try {
      const response = await tuTurnoApi.post("/appointments", appointment);
      const data = response.data;
      showToast("El turno se reservó correctamente.", "success");
      setErrorAppointment("");
      getUserAppointments(data.turno.client_id);
      localStorage.removeItem("newAppointment");
      handleCreateNewAppointment(false);//reseteo flag de crear nuevo turno para mostrar la home del user
    } catch (error) {
      localStorage.removeItem("newAppointment");
      setErrorAppointment(error.response.data?.message || "Error al crear turno");
      Swal.fire('Error al crear turno', error.response.data?.message, 'error');
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await tuTurnoApi.put(`/appointments/cancel/${appointmentId}`, {
        is_cancelled: true
      });
      const data = response.data;
      // Actualizar lista local tras cancelación
      showToast("El turno se canceló correctamente.", "success");
      getUserAppointments(data.turno.client_id);
      setUserAppointments(prev =>
        prev.map(turno =>
          turno._id === appointmentId ? { ...turno, is_cancelled: true } : turno
        )
      );
    } catch (error) {
      console.error("Error al cancelar el turno:", error);
    }
  };



  return({
    appointment, 
    handleAppointment,
    day,
    handleDay,
    hour,
    handleHour,
    category,
    handleCategory,
    professional,
    handleProfessional,
    createNewAppointment,
    userAppointmentsLoading,
    userAppointments,
    setUserAppointmentsLoading,
    setUserAppointments,
    getUserAppointments,
    collectNewAppointmentData,
    cancelAppointment
  });
};