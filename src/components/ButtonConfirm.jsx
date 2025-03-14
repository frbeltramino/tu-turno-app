import React, { useContext, useState } from 'react'
import { ModalCommon } from './ModalCommon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { DatesAndHoursContext } from '../context/DatesAndHoursContext';
import { ProfessionalsAndServicesContext } from '../context/ProfessionalsAndServicesContext';
import { capitalize } from '../utils/commonUtilities.js'
import { AuthContext } from '../context/AuthContext';


export const ButtonConfirm = () => {

  const [modalOpen, setModalOpen] = useState(false);

   const { getDateSelected, getHourSelected, getWorkingDaysProfessional, getArrAMHours, getArrPMHours  } = useContext(DatesAndHoursContext);
   const { getSelectedService, getSelectedProfessional } = useContext(ProfessionalsAndServicesContext);
   const { handleOnAutenticate} = useContext(AuthContext)

   const onSubmitAppointment = () => {
    const inputParams = {
      serviceName: getSelectedService().name,
      serviceId: getSelectedService().id,
      professionalName: getSelectedProfessional().name,
      professionalId: getSelectedProfessional().id,
      userName:"Juan",
      userEmail:"juan@gmail.com",
      userId:"123456789",
      service: getSelectedService(),
      professional: getSelectedProfessional(),
      date: getDateSelected(),
      hour: getHourSelected()
    }
    localStorage.setItem("newAppointment", JSON.stringify(inputParams));
    handleOnAutenticate(true);
    
  }


  return (
    <>
      <div div className="col-12 col-md-12" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '16px', marginBottom: '16px' }}>
        <button 
        className={ getHourSelected().id != null ? 'btn btn-primary w-100 w-md-200' : 'btn btn-secondary w-100 w-md-200'}
        disabled={ getHourSelected().id == null }
        onClick={() => { setModalOpen(true) }}> 
        <FontAwesomeIcon icon={faShoppingCart} size="1x" color="white"/>
        &nbsp;
        Pedir Turno</button>
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {
            getDateSelected().id != null && getHourSelected().id != null &&
            <div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: "20px"}}>📝 Confirmación de turno</span>
                </div>
                 
              </div>
              <div className='mt-2'>
                <p><strong>Servicio:</strong> { getSelectedService().name}</p>
                <p><strong>Profesional:</strong> {getSelectedProfessional().name}</p>
                <p><strong>Fecha:</strong> {getDateSelected().day + " " + getDateSelected().dayNumber + " de " + capitalize(getDateSelected().month)}</p>
                <p><strong>Hora:</strong> {getHourSelected().hour}</p>

              </div> 

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={() => onSubmitAppointment() }>Autenticarme y reservar</button>
              </div>
            </div>
          }
        </ModalCommon>
      </div>
    </>
  )
}
