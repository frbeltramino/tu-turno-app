import React, { useEffect, useState } from 'react'
import { ProfessionalsAndServicesContext } from './ProfessionalsAndServicesContext'

export const ProfessionalsAndServicesProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState({});
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [professional, setProfessional] = useState({});
  const [error, setError] = useState({});

  const getServices = () => {
    fetch("/mocks/services.json") // Llama al JSON en public/
      .then((response) => response.json())
      .then((data) => handleData(data))
      .catch((error) => setError(error));
  };

  const handleData = (data) => {
    if (data.services){
      setServices(data.services);
      setError(false);
    } else {
      setError(data.error)
    }
    
  } 

  useEffect(() => {
    if (services.length === 0) {
      getServices();
    } else {
      setServices(services);
    }
  }, []);

  const slectOneService = (serviceParam) => {
    setProfessional({});
    if (serviceParam.id !== selectedService.id) {
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
