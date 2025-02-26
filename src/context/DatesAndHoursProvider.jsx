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


   /* fetch("/mocks/datesAndHours.json") // Llama al JSON en public/
      .then((response) => response.json())
      .then((data) => {
        setDates(data.dates);
      })
      .catch((error) => {
        console.error("Error cargando datos:", error)
      });*/
  };

  useEffect(() => {
    if (dates.length === 0) {
      getDates();
    } else {
      setDates(dates);
    }
  }, []);

  // const setDatesAndHours = (datesAndHours) => {
  //   setDates(datesAndHours);
  // };

  const onSelectDate = (date) => {

    setOneDayActive(date);
    const newDates = dates;
    for (let i = 0; i < newDates.length; i++) {
      if (newDates[i].id === selectedDay.id) {
        newDates[i] = selectedDay;
      }
    }
    setDates(newDates);

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

  };

  const divideHours = () => {
    if (hours.length > 0){
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

  const showCalendarLoading = (isLoading) => {
    setCalendarLoading(isLoading);
  };

  useEffect(() => {
    showHoursLoading(true);
    divideHours();
    setTimeout(() => {
      showHoursLoading(false);
    }, 1000);
  }, [selectedDay]);

  const setProfessionalWD = (workingDates) => {
    setDates(workingDates)
    setWorkingDates(workingDates);
  };

  useEffect(() => {
    showCalendarLoading(true);
    setTimeout(() => {
      showCalendarLoading(false);
    }, 1000);
  }, [workingDates]);

  const setProfessionalWH = (date) => {
    const workingHours = date.working_hours;
    const timeTurns = date.time_turns;
    let timeTurnsConstant = "";
    const arrHours = [];
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
        timeTurnsConstant ="30_MINUTES_TURNS";
        break;
    }

    turnConstants().turns.duration[timeTurnsConstant].forEach((hour, index) => {
      if (hour >= workingHours.start && hour <= workingHours.end) {
        arrHours.push({
          hour: hour,
          isActive: false,
          isDisabled: false,
          id: index,
          //day: date.day,
          //dayNumber: date.date
        });
      }
      
    });
    setWorkingHours(workingHours);
    setHours(arrHours);
    

  };


   const setProfessionalWorkingDays = (professionaParam) => {
      const professionalWorkingDays = professionaParam.working_days;
      const professionalWorkingOcuppedTurns = professionaParam.ocupped_turns;
      const arrWorkingDays = dates;
      const arrProfessionalWorkingDays = [];
  
      for (let l = 0; l < arrWorkingDays.length; l++) {//recorro los dias que trae el servicio de fechas
        arrWorkingDays[l].isDisabled = true;
        arrWorkingDays[l].working_hours = {};
        arrWorkingDays[l].time_turns = "";
        arrWorkingDays[l].isActive = false;
      }
  
      for (let i = 0; i < professionalWorkingDays.length; i++) {//recorro los dias de trabajo del profesional
        for (let j = 0; j < arrWorkingDays.length; j++) {//recorro los dias que trae el servicio de fechas
          if (arrWorkingDays[j].day == professionalWorkingDays[i].day) {
            arrWorkingDays[j] = searchAndModifyDates(arrWorkingDays[j], professionalWorkingDays[i], professionaParam.time_turns);
          }

        }
      }
    
      setProfessionalWD(arrWorkingDays);
    }
  
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
     
    }, [hoursAM, hoursPM]);

    const resetSelectedDay = () => {
      setSelectedDay({});
      setHours([]);
      resetWorkingHours();
    }


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
      resetSelectedDay
    }}>
      {children}
    </DatesAndHoursContext.Provider>
  )
}
