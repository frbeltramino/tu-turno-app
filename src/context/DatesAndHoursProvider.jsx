import React, { useEffect, useLayoutEffect, useState } from 'react'
import { DatesAndHoursContext } from './DatesAndHoursContext'
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { turnConstants } from '../turnConstants';

export const DatesAndHoursProvider = ({ children }) => {


  const [dates, setDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState({});
  const [hours, setHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState({});
  const [hoursAM, setHoursAM] = useState([]);
  const [hoursPM, setHoursPM] = useState([]);
  const [hoursLoading, setHoursLoading] = useState(true);
  const [workingDates, setWorkingDates] = useState([]);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [workingHours, setWorkingHours] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [professional, setProfessional] = useState({});
  const [feriados, setFeriados] = useState([]);

  // const setDatesAndHours = (datesAndHours) => {
  //   setDates(datesAndHours);
  // };

  useEffect(() => {
    if (appointments.length === 0) {
      setAppointments(appointments);
    } else {
      getTurnsNotAvailable(professional);
    }
  }, [professional]);

  const getTurnsNotAvailable = (professional) => {
    setProfessional(professional);
    fetch("/mocks/appointments.json") // Llama al JSON en public/
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data.appointments);

      })
      .catch((error) => {
        console.error("Error cargando turnos cargados:", error)
      });
  }

  const divideHours = () => {
    if (hours.length > 0) {
      const hoursAM = [];
      const hoursPM = [];
      hours.forEach((hour) => {
        if (hour.hour <= "13:30") {
          hoursAM.push(hour);
        } else {
          hoursPM.push(hour);
        }
      });
      setHoursAM(hoursAM);
      setHoursPM(hoursPM);
    }


  };

  const onSelectHour = (hourSelected) => {
    const newHours = hours;
    onSetOneHourActive(hourSelected);
    for (let i = 0; i < newHours.length; i++) {
      if (newHours[i].id === hourSelected.id) {
        newHours[i] = hourSelected;
      }
    }
    setHours(newHours);
  };

  const onSetOneHourActive = (SelectedHourParam) => {
    if (selectedHour.isActive) {
      selectedHour.isActive = !selectedHour.isActive;
    }
    SelectedHourParam.isActive = !SelectedHourParam.isActive;
    setSelectedHour(SelectedHourParam);
  };

  const showHoursLoading = (isLoading) => {
    setHoursLoading(isLoading);
  };

  const setProfessionalWH = (date) => {
    const profWorkingHours = date.working_hours;
    const timeTurns = date.time_turns;
    let timeTurnsConstant = "";
    let arrAppointments = [];
    let arrHours = [];
    let isDisabled = false;
    showHoursLoading(true);

    switch (timeTurns) {
      case timeTurns === "10":
        timeTurnsConstant = "10_MINUTES_TURNS";
        break;
      case timeTurns === "20":
        timeTurnsConstant = "20_MINUTES_TURNS";
        break;
      case timeTurns === "30":
        timeTurnsConstant = "30_MINUTES_TURNS";
        break;
      case timeTurns === "40":
        timeTurnsConstant = "40_MINUTES_TURNS";
        break;
      case timeTurns === "50":
        timeTurnsConstant = "50_MINUTES_TURNS";
        break;
      case timeTurns === "60":
        timeTurnsConstant = "60_MINUTES_TURNS";
        break;
      default:
        timeTurnsConstant = "30_MINUTES_TURNS";
        break;
    }
    for (let i = 0; i < appointments.length; i++) {//Busco los turnos ya ocupados para la fecha seleccionada
      if (appointments[i].id_professional == professional.id && appointments[i].date == date.date) {
        arrAppointments.push(appointments[i]);
      }
    }

    arrHours = verifyAppointmentsHours(timeTurnsConstant, profWorkingHours, professional, date, arrAppointments);

    if (arrHours.length > 0) {
      const hoursAM = [];
      const hoursPM = [];
      arrHours.forEach((hour) => {
        if (hour.hour <= "13:30") {
          hoursAM.push(hour);
        } else {
          hoursPM.push(hour);
        }
      });
      setHoursAM(hoursAM);
      setHoursPM(hoursPM);
    }
    setWorkingHours(profWorkingHours);
    setHours(arrHours);
  };

  const verifyAppointmentsHours = (timeTurnsConstant, profWorkingHours, professional, date, arrAppointments) => {
    const arrHours = [];
    let isDisabled = false;
    if (arrAppointments.length > 0) {
      turnConstants().turns.duration[timeTurnsConstant].forEach((hour, index) => {
        if (hour >= profWorkingHours.start && hour <= profWorkingHours.end) {
          if (hour >= profWorkingHours.start && hour <= profWorkingHours.end) {//entre las horas de inicio y fin del profesional
            for (let j = 0; j < arrAppointments.length; j++) {// tengo que ver si esa hora esta ocupada
              if (hour >= arrAppointments[j].start_hour && hour <= arrAppointments[j].end_hour) {// Si la hora esta entre las horas de inicio y de fin de un turno ocupado - se desahabilita
                isDisabled = true;
              } else {
                isDisabled = false;
              }
            }
            arrHours.push({
              hour: hour,
              isActive: false,
              isDisabled: isDisabled,
              id: index,
            });
          }
        }
      })
    } else {
      turnConstants().turns.duration[timeTurnsConstant].forEach((hour, index) => {
        if (hour >= profWorkingHours.start && hour <= profWorkingHours.end) {//Si no hay turnos ya ocupados, se agrega el turno
          arrHours.push({
            hour: hour,
            isActive: false,
            isDisabled: false,
            id: index,
          });
        }
      })
    }
    return arrHours;
  }



  //---------------------------------------------------------------worging days--------------------------------------------------------------------//

  const showCalendarLoading = (isLoading) => {
    setCalendarLoading(isLoading);
  };

  const getDates = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const day = turnConstants().turns.spanish_days[date.getDay()];
      const dayNumber = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const isActive = false;
      const isDisabled = true;
      const id = i + 1;
      dates.push({
        date: date.toISOString().split('T')[0],
        isActive,
        isDisabled,
        id,
        month,
        day,
        dayNumber
      });
    }

    setDates(dates);
  };

  useEffect(() => {
    if (dates.length === 0) {
      getDates();
    } else {
      setDates(dates);
    }
  }, []);

  const getFeriados = () => {
    fetch("/mocks/feriados2025.json") // Llama al JSON en public/
      .then((response) => response.json())
      .then((data) => setFeriados(data.feriados))
      .catch((error) => console.error("Error cargando datos:", error));
  };

  useEffect(() => {
    if (feriados.length === 0) {
      getFeriados();
    } else {
      setFeriados(feriados);
    }
  }, []);

  useEffect(() => {

  }, [selectedDay]);

  const setProfessionalWorkingDays = (professionaParam, timeTurns) => {
    setProfessional(professionaParam);
    const professionalWorkingDays = professionaParam.working_days;
    const professionalWorkingOcuppedTurns = professionaParam.ocupped_turns;
    const professionalHolidays = professionaParam.holidays;
    const arrWorkingDays = dates;
    const arrProfessionalWorkingDays = [];

    for (let l = 0; l < arrWorkingDays.length; l++) {//recorro los 30 dias que genero a paretir de hoy
      arrWorkingDays[l].isDisabled = true;
      arrWorkingDays[l].working_hours = {};
      arrWorkingDays[l].time_turns = "";
      arrWorkingDays[l].isActive = false;
    }

    for (let i = 0; i < professionalWorkingDays.length; i++) {//recorro los dias de trabajo del profesional
      for (let j = 0; j < arrWorkingDays.length; j++) {//recorro los 30 dias que genero a paretir de hoy
        if (arrWorkingDays[j].day == professionalWorkingDays[i].day) {
          arrWorkingDays[j] = searchAndModifyDates(arrWorkingDays[j], professionalWorkingDays[i], timeTurns);
        }

      }
    }

    setProfessionalWD(arrWorkingDays, professionalHolidays);
  }

  const setProfessionalWD = (workingDates, professionalHolidays) => {
    setDates(workingDates);
    if (feriados.length > 0) {
      setHolidayDates();
    } else {
      setWorkingDates(workingDates);
    }
    if (professionalHolidays.length > 0) {
      setHolidaysProfessional(workingDates, professionalHolidays);
    }
  };

  const setHolidayDates = () => {// seteo feriados
    const arrDatesWithHolidays = [];
    for (let i = 0; i < dates.length; i++) {//recorro los dias laborales del profesional
      for (let j = 0; j < feriados.length; j++) { // recorro los feriados
        if (dates[i].date === feriados[j].fecha) {
          dates[i].isHoliday = true;
          dates[i].isDisabled = true;
        }
        arrDatesWithHolidays.push(dates[i]);
      }
    }
    setWorkingDates(arrDatesWithHolidays);
  }

  const setHolidaysProfessional = (workingDates, professionalHolidays) => {// Seteo vacaciones de los profesionales
    const arrWorkingDays = workingDates;
    for (let i = 0; i < professionalHolidays.length; i++) {
      for (let j = 0; j < arrWorkingDays.length; j++) {
        if (arrWorkingDays[j].date === professionalHolidays[i]) {
          arrWorkingDays[j].isHoliday = true;
          arrWorkingDays[j].isDisabled = true;
        }
      }
    }
    setWorkingDates(arrWorkingDays);
  }

  useEffect(() => {
    showCalendarLoading(true);
    setTimeout(() => {
      showCalendarLoading(false);
    }, 1000);
  }, [workingDates]);






  const searchAndModifyDates = (date, professionalWorkingDay, timeTurns, professionalWorkingOcuppedTurns) => {
    date.isActive = false;
    date.isDisabled = false;
    date.working_hours = professionalWorkingDay.working_hours;
    date.time_turns = timeTurns;
    date.ocupped_turns = professionalWorkingOcuppedTurns;
    return date
  }

  const resetWorkingHours = () => {
    setHoursAM([]);
    setHoursPM([]);
  }

  useEffect(() => {
    showHoursLoading(true);
    setTimeout(() => {
      showHoursLoading(false);
    }, 1000);

  }, [hoursAM, hoursPM]);

  const resetSelectedDay = () => {
    setSelectedDay({});
    setHours([]);
    resetWorkingHours();
    setSelectedHour({});
  };

  const getDateSelected = () => {
    return selectedDay;
  };

  const getHourSelected = () => {
    return selectedHour;
  }

  const onSelectDate = (date, professional) => {
    setOneDayActive(date);
    //getTurnsNotAvailable(date);//llamaria al servicio de traer turnos una vez seleccionados profesional y fecha
  };

  const setOneDayActive = (date) => {
    // selecciono el dia activo
    if (selectedDay.isActive) {
      selectedDay.isActive = !selectedDay.isActive;
    }
    date.isActive = !date.isActive;
    setSelectedDay(date);
    setProfessionalWH(date);
    //setHours(date.hours);
    // divideHours();
    const newDates = dates;
    for (let i = 0; i < newDates.length; i++) {
      if (newDates[i].id === selectedDay.id) {
        newDates[i] = selectedDay;
      }
    }
    setDates(newDates);


  };


  return (
    <DatesAndHoursContext.Provider value={{
      dates,
      setDates,
      selectedDay,
      setSelectedDay,
      hours,
      selectedHour,
      setSelectedHour,
      hoursAM,
      hoursPM,
      onSelectDate,
      onSelectHour,
      hoursLoading,
      setProfessionalWD,
      calendarLoading,
      setProfessionalWH,
      setProfessionalWorkingDays,
      resetWorkingHours,
      resetSelectedDay,
      getDateSelected,
      getHourSelected,
      getTurnsNotAvailable
    }}>
      {children}
    </DatesAndHoursContext.Provider>
  )
}
