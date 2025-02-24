import React, { useEffect, useState } from 'react'
import { ProfessionalsAndServicesContext } from './ProfessionalsAndServicesContext'

export const ProfessionalsAndServicesProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState({});
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [professional, setProfessional] = useState({});

  const getServices = () => {
    fetch("/mocks/services.json") // Llama al JSON en public/
      .then((response) => response.json())
      .then((data) => setServices(data.services))
      .catch((error) => console.error("Error cargando datos:", error));
  };

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

  
  return (
    <ProfessionalsAndServicesContext.Provider value={{ 
    services,
    selectedService,
    setSelectedService,
    slectOneService,
    professionals,
    setProfessionals,
    professional,
    setProfessional 
    }}>
      { children }
    </ProfessionalsAndServicesContext.Provider>
  )
}
