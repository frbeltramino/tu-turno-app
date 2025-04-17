import React, { useEffect, useState } from 'react'
import { ProfessionalsAndServicesContext } from './ProfessionalsAndServicesContext'
import { tuTurnoApi } from '../api';

export const ProfessionalsAndServicesProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState({});
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [professional, setProfessional] = useState({});
  const [error, setError] = useState({});

  /*const getServices = () => {
    fetch("/mocks/services.json") // Llama al JSON en public/
      .then((response) => response.json())
      .then((data) => handleData(data))
      .catch((error) => setError(error));
  };*/

  const getServices = async () => {
    
    try {
      const response = await tuTurnoApi.get("/servicesAndProfessionals");
      
  
      const data = response.data;
      if (!data.ok) {
        throw new Error(data.message || "Error en la consulta de servicios");
      }
      setServices(data.services);
      setError(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || "Error en la consulta de servicios");
      } else {
        setError("No se pudo conectar con el servidor");
      }
    }
  };
 /* const handleData = (data) => {
    if (data.services){
      setServices(data.services);
      setError(false);
    } else {
      setError(data.error)
    }
    
  } */

  useEffect(() => {
    if (services.length === 0) {
      getServices();
    } else {
      setServices(services);
    }
  }, []);

  const slectOneService = (serviceParam) => {
    setProfessional({});
    if (serviceParam._id !== selectedService._id) {
      setSelectedService(serviceParam);
      setProfessionalsDefault(serviceParam.professionals);
    }

  };

  const setProfessionalsDefault = (professionalDefault) => {
    if (professionalDefault.length > 0) {
      setProfessionals(professionalDefault);
    }
    
  };

  useEffect(() => {
   
  }, [selectedService]);

  const getSelectedService = () => {
    return selectedService;
  };

  const getSelectedProfessional = () => {
    return professional;
  };


  return (
    <ProfessionalsAndServicesContext.Provider value={{ 
    services,
    selectedService,
    setSelectedService,
    slectOneService,
    professionals,
    setProfessionals,
    professional,
    setProfessional ,
    getSelectedProfessional,
    getSelectedService,
    error
    }}>
      { children }
    </ProfessionalsAndServicesContext.Provider>
  )
}
