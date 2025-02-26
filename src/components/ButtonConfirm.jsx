import React, { useContext, useState } from 'react'
import { ModalCommon } from './ModalCommon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { DatesAndHoursContext } from '../context/DatesAndHoursContext';
import { ProfessionalsAndServicesContext } from '../context/ProfessionalsAndServicesContext';
import { capitalize } from '../utils/commonUtilities.js'


export const ButtonConfirm = () => {

  const [modalOpen, setModalOpen] = useState(false);

   const { getDateSelected, getHourSelected } = useContext(DatesAndHoursContext);
   const { getSelectedService, getSelectedProfessional } = useContext(ProfessionalsAndServicesContext);


  return (
    <>
      <div div className="col-12 col-md-12" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '16px', marginBottom: '16px' }}>
        <button 
        className={ getDateSelected().id != null ? 'btn btn-primary' : 'btn btn-secondary'}
        disabled={ getDateSelected().id == null}
        style={{ width: "200px" }} onClick={() => { setModalOpen(true) }}> 
        <FontAwesomeIcon icon={faShoppingCart} size="1x" color="white" 
        /> Pedir Turno</button>
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

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button className="btn btn-success" onClick={() => console.log("turno confirmado")}>Confirmar</button>
              </div>
            </div>
          }
        </ModalCommon>
      </div>
    </>
  )
}
