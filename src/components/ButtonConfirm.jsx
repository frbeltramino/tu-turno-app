import React, { useContext, useState } from 'react'
import { ModalCommon } from './ModalCommon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { DatesAndHoursContext } from '../context/DatesAndHoursContext';
import { ProfessionalsAndServicesContext } from '../context/ProfessionalsAndServicesContext';
import { capitalize } from '../utils/commonUtilities.js'
import { AuthContext } from '../context/AuthContext';
import { useAppointment } from '../hooks/useAppointment.js';
import { useTranslation } from "react-i18next";
import { formatDate } from '../utils/commonUtilities.js'


export const ButtonConfirm = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const { getDateSelected, getHourSelected, getWorkingDaysProfessional, getArrAMHours, getArrPMHours  } = useContext(DatesAndHoursContext);
  const { getSelectedService, getSelectedProfessional } = useContext(ProfessionalsAndServicesContext);
  const { handleOnAutenticate, authStatus } = useContext(AuthContext)
  const { createNewAppointment, collectNewAppointmentData } = useAppointment();
  const { t } = useTranslation();

   const getAppointmentData = () => {
    return {
      serviceName: getSelectedService().name,
      serviceId: getSelectedService().id,
      professionalName: getSelectedProfessional().name,
      professionalId: getSelectedProfessional().id,
      service: getSelectedService(),
      professional: getSelectedProfessional(),
      date: getDateSelected(),
      hour: getHourSelected()
    }
  }
  const calculateEndHour = (startHour, durationInMinutes) => {
    const [hours, minutes] = startHour.split(':').map(Number);
    const startDate = new Date(0, 0, 0, hours, minutes);
    
    const endDate = new Date(startDate.getTime() + durationInMinutes * 60000);
    
    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
  
    return `${endHours}:${endMinutes}`;
  };

   const onSubmitAppointment = () => {
    
    if (authStatus === "authenticated"){
      const userData = JSON.parse(localStorage.getItem("user"));
      const inputParamsUser = {
        userName: userData.name,
        userEmail: userData.email,
        userId: userData._id,
        userPhone: userData.phone,
      }
      const newAppointmentData = getAppointmentData();

      collectNewAppointmentData(inputParamsUser, newAppointmentData);

      setModalOpen(false);
    } else {
      const newAppointmentData = getAppointmentData();
      localStorage.setItem("newAppointment", JSON.stringify(newAppointmentData));
      handleOnAutenticate(true);
    }

    
   
    
  }


  return (
    <>
      <div div className="col-12 col-md-12" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '16px', marginBottom: '16px' }}>
        {getHourSelected().id == null ? <div></div>
          :
          <button
            className={getHourSelected().id != null ? 'btn btn-primary w-100 w-md-200' : 'btn btn-secondary w-100 w-md-200'}
            disabled={getHourSelected().id == null}
            onClick={() => { setModalOpen(true) }}>
            <FontAwesomeIcon icon={faShoppingCart} size="1x" color="white" />
            &nbsp;
            {t("i18n.appointments.026")}</button>
        } 
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {
            getDateSelected().id != null && getHourSelected().id != null &&
            <div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: "20px"}}>{ t("i18n.appointments.027") }</span>
                </div>
                 
              </div>
              <div className='mt-2'>
                <p><strong>{ t("i18n.appointments.028") }</strong> { getSelectedService().name}</p>
                <p><strong>{ t("i18n.appointments.029") }</strong> {getSelectedProfessional().name}</p>
                <p><strong>{ t("i18n.appointments.030") }</strong> {formatDate(getDateSelected().date)}</p>
                <p><strong>{ t("i18n.appointments.031") }</strong> {getHourSelected().hour + " hs."}</p>

              </div> 

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={() => onSubmitAppointment() }>{authStatus === "authenticated" ? t("i18n.appointments.032") : t("i18n.appointments.033")}</button>
              </div>
            </div>
          }
        </ModalCommon>
      </div>
    </>
  )
}
