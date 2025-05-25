import { useContext, useEffect, useState } from "react";
import { tuTurnoApi } from "../api";
import { ToastContext } from '../context/ToastContext.jsx';
import Swal from 'sweetalert2';
import { AppointmentsContext } from "../context/AppointmentsContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

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
  const {loading, setLoading} = useContext(AuthContext);
 


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
      "service_name": appointmentData.service.name,
      "service_id": appointmentData.service._id,
      "is_virtual": appointmentData.service.is_virtual
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
    setLoading(true);
    try {
      const response = await tuTurnoApi.post("/appointments", appointment);
      const data = response.data;
      showToast("El turno se reservó correctamente.", "success");
      setErrorAppointment("");
      getUserAppointments(data.turno.client_id);
      localStorage.removeItem("newAppointment");
      handleCreateNewAppointment(false);//reseteo flag de crear nuevo turno para mostrar la home del user
      setLoading(false);
    } catch (error) {
      localStorage.removeItem("newAppointment");
      setErrorAppointment(error.response.data?.message || "Error al crear turno");
      Swal.fire('Error al crear turno', error.response.data?.message, 'error');
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await tuTurnoApi.put(`/appointments/cancelByClient/${appointmentId}`);
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
      Swal.fire('Error al cancelar turno', error.response.data?.message, 'error');
    }
  };


  const verifyAppointmentsHours = (timeTurnsConstant, profWorkingHours, professional, date, arrAppointments) => {
    const arrHours = [];
    const availableHours = turnConstants().turns.duration[timeTurnsConstant];
    const isWithinRange = (hour, range) => range && hour >= range.start && hour < range.end;
    const markHour = (hour, isDisabled, id) => {
      arrHours.push({
        hour,
        isActive: false,
        isDisabled,
        id,
      });
    };
    let j = 0;
    let i = 0;
    if (arrAppointments.length > 0) {// si hay turnos dados para este profesional
      for (const appt of arrAppointments) {
        const apptStartHour = appt.start_hour;
        const apptEndHour = appt.end_hour;

        for (let i = 0; i < availableHours.length; i++) {//recorro los turnos que se listan en la aplicacion
          if (isWithinRange(hour, profWorkingHours.am) || isWithinRange(hour, profWorkingHours.pm)) {
            const avStartHour = availableHours[i];
            const avEndHour = availableHours[i + 1];
            const overlaps = 
              ( avStartHour >= apptStartHour && avEndHour < apptEndHour ) ||
              ( avEndHour > apptStartHour && avEndHour <= apptEndHour ) ||
              ( avStartHour <= apptStartHour && avEndHour >= apptEndHour );

            if (overlaps) {
              markHour(availableHours[i], true, true, i);
              i++;
            }
          }
        };
      }
    } else {
       availableHours.forEach((hour, index) => {
        const isInAM = isWithinRange(hour, profWorkingHours.am);
        const isInPM = isWithinRange(hour, profWorkingHours.pm);

        if (isInAM || isInPM) {
          markHour(hour, false, index);
        }
      });
    }

  }




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