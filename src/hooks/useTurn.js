import { useEffect, useState } from "react";

export const useTurn = () => {


  const [turn, setTurn] = useState({});
  const [totalDays, setTotalDays] = useState();
  const [day, setDay] = useState({});
  const [hour, setHour] = useState({});
  const [category, setCategory] = useState({});
  const [professional, setProfessional] = useState({});

  const handleTurn = (turn) => {
    setTurn(turn);
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

  const handleTotalDays = (totalDays) => {
    setTotalDays(totalDays);
  };  

  useEffect(() => {
    handleTotalDays(totalDays);
  }, [totalDays]);

  return({
    turn, 
    handleTurn,
    day,
    handleDay,
    hour,
    handleHour,
    category,
    handleCategory,
    professional,
    handleProfessional,
    totalDays,
    handleTotalDays
  });
};