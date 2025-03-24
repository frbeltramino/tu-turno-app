import { useEffect, useState } from "react";

export const useAppointment = () => {


  const [appointment, setAppointment] = useState({});
  const [day, setDay] = useState({});
  const [hour, setHour] = useState({});
  const [category, setCategory] = useState({});
  const [professional, setProfessional] = useState({});

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

  const getAppointmentData = async () => {
    try {
      const response = await tuTurnoApi.get("/appointments/");
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
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
    handleProfessional
  });
};