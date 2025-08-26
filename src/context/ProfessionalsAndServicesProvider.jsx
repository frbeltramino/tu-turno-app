import React, { useEffect, useState } from 'react'
import { ProfessionalsAndServicesContext } from './ProfessionalsAndServicesContext'
import { tuTurnoApi } from '../api';
import { useTranslation } from "react-i18next";

export const ProfessionalsAndServicesProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState({});
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [professional, setProfessional] = useState({});
  const [error, setError] = useState({});
  const { t } = useTranslation();

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
        throw new Error(data.message || t("i18n.Professionals.provider.001"));
      }
      setServices(data.services);
      setError(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || t("i18n.Professionals.provider.001"));
      } else {
        setError(t("i18n.Professionals.provider.002"));
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
