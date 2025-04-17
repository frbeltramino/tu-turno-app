import React, { useEffect, useLayoutEffect, useState } from 'react'
import { DatesAndHoursContext } from './DatesAndHoursContext'
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { turnConstants } from '../turnConstants';
import { splitDate } from '../utils/commonUtilities.js';
import tuTurnoApi from '../api/tuTurnoApi.js';

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
  const [selectedServiceDuration, setSelectedServiceDuration] = useState();

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

 /* const getTurnsNotAvailable = (professional) => {
    setProfessional(professional);
    fetch("/mocks/appointments.json") // Llama al JSON en public/
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data.turnos);

      })
      .catch((error) => {
        console.error("Error cargando turnos cargados:", error)
      });
  }*/

  const getTurnsNotAvailable = async (professional) => {
    try {
      setProfessional(professional);
  
      const response = await tuTurnoApi.get("/appointments/activeAppointments");
  
      if (response.data.ok) {
        setAppointments(response.data.turnos); // Asumimos que la API devuelve { ok: true, turnos: [...] }
      } else {
        console.error("Error en la respuesta de turnos:", response.data.message);
      }
    } catch (error) {
      console.error("Error al obtener turnos desde la API:", error);
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
      let formatedAppointementDate = splitDate(appointments[i].date, "T", 0);
      if (appointments[i].professional_id == professional._id && formatedAppointementDate == date.date) {
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
      while (availableHours.length > j) {//mientrtas haya horarios disponibles
        if (isWithinRange(availableHours[j], profWorkingHours.am) || isWithinRange(availableHours[j], profWorkingHours.pm)) {// se agregan si corresponden al rango horario del profesional

          if (arrAppointments[i] && availableHours[j] === arrAppointments[i].start_hour) {// si el horario coincide con un turno dado se marca como ocupado

            if (arrAppointments[i].duration <= selectedServiceDuration) {// si el turno dado es menor o igual que el turno que se esta listando se ofusca un solo turno.

              const isDisabled = availableHours[j] === arrAppointments[i].start_hour && availableHours[j] <= arrAppointments[i].end_hour;
              markHour(availableHours[j], isDisabled, j);
              j++;// paso al siguiente horario disponible
              i++;// paso al siguiente turno dado.
            } else {// si el turno dado contempla mas tiempo que los turnos que se estan listando, se ocupan los turnos necesarios hasta completar el rango de horario. ej turno dado de 1hr pero se listan horarios de 30min - serian 2 turnos ocupados.
              let remainingDuration = arrAppointments[i].duration;

              while (remainingDuration > 0 && j < availableHours.length) {
                const hour = availableHours[j];
                markHour(hour, true, j);
                j++;
                remainingDuration -= selectedServiceDuration;
              }
              i++;
            }

          } else {
            markHour(availableHours[j], false, j);
            j++;
          }
        } else {
          j++;
        }

      };
    } else {

      availableHours.forEach((hour, index) => {
        const isInAM = isWithinRange(hour, profWorkingHours.am);
        const isInPM = isWithinRange(hour, profWorkingHours.pm);

        if (isInAM || isInPM) {
          markHour(hour, false, index);
        }
      });
    }

  
    return arrHours;
  };






  //---------------------------------------------------------------worging days--------------------------------------------------------------------//

  const showCalendarLoading = (isLoading) => {
    setCalendarLoading(isLoading);
  };

  const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
      const localDate = getLocalDateString(date);
      dates.push({
        date: localDate,
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

  const getFeriados = async () => {
    try {
      const { data } = await tuTurnoApi.get("/holidays/");
      setFeriados(data.holidays);
    } catch (error) {
      console.error("Error cargando feriados", error);
    }
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

  const setProfessionalWorkingDays = (professionaParam, timeTurns, selectedService) => {
    setProfessional(professionaParam);
    setSelectedServiceDuration(selectedService.time_turns);
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

  const setProfessionalWD = (workingDatesParam, professionalHolidays) => {
    setDates(workingDatesParam);
    if (feriados.length > 0) {
      setHolidayDates();
    } else {
      setWorkingDates(workingDatesParam);
    }
    if (professionalHolidays.length > 0) {
      setHolidaysProfessional(workingDatesParam, professionalHolidays);
    }
  };

  const setHolidayDates = () => {// seteo feriados
    const arrDatesWithHolidays = [];
    for (let i = 0; i < dates.length; i++) {//recorro los dias laborales del profesional
      for (let j = 0; j < feriados.length; j++) { // recorro los feriados
        let feriadoFormated = splitDate(feriados[j].date, "T", 0);
        if (dates[i].date === feriadoFormated) {
          dates[i].isHoliday = true;
          dates[i].isDisabled = true;
        }
      }
      arrDatesWithHolidays.push(dates[i]);
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
      getTurnsNotAvailable,
      appointments
    }}>
      {children}
    </DatesAndHoursContext.Provider>
  )
}
