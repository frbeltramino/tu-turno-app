import React, { useContext, useState } from 'react'
import { HourElement } from './HourElement';
import { useDateAndHours } from '../hooks/useDateAndHours';
import { DatesAndHoursContext } from '../context/DatesAndHoursContext';
import { LoadingMessage } from './LoadingMessage';
import { ModalCommon } from './ModalCommon';


export const HoursComponent = () => {


  const { hours, hoursAM, hoursPM, onSelectHour, hoursLoading } = useContext(DatesAndHoursContext);

  const [modalOpen, setModalOpen] = useState(false);

  const onShowModal = () => {
    setModalOpen(!modalOpen);
  }


  return (
    <>
      <div className='row' style={{ justifyContent: 'center' }}>
        <div className='col-10 offset-sm-1 col-md-8 mt-5' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> 
          <h3>Horarios disponibles</h3>
        </div>
      </div>

      {
        hoursAM.length == 0 && hoursPM.length == 0 ? //si no se selecciona ninguna fecha se muestra el mensaje de no hay fecha seleccionada
        <div className='row' style={{ justifyContent: 'center' }}>
          <div className='col-10 offset-sm-1 col-md-8 mt-5' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> 
            <div className="alert alert-warning">
              ⚠️ <strong>No hay fecha seleccionada</strong>.
            </div>
          </div>
        </div>
        : hoursLoading ? // si se estan cargando las horas se muestra el mensaje de cargando
        <LoadingMessage /> 
        :
        <div className='row' style={{ justifyContent: 'center' }}>
        
          <div className="col-6 offset-sm-0 offset-md-0 col-md-6" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right', alignItems: 'center' }}>
            {
              hoursAM.map((hour, index) => {
                return (
                  <HourElement hour={hour} hourKey={index} onSelectHour={onSelectHour} onShowModal={onShowModal} />
                )
              })
            }
          </div>
          <div className="col-6 col-md-6" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'center' }}>
            {
              hoursPM.map((hour, index) => {
                return (
                  <HourElement hour={hour} hourKey={index} onSelectHour={onSelectHour} onShowModal={onShowModal} />
                )
              })
            }
          </div>
        </div>
      }

      <div className="flex flex-col items-center justify-center h-screen">
        <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {
            <div>
              <div className="modal-header">⚠️</div>
              <p className='modal-body'>La hora que quiere seleccionar no se encuentra disponible para éste profesional. Por favor, seleccione otra hora.</p>
            </div>
          }
        </ModalCommon>
      </div>

    </>
  )
}
