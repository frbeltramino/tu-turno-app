import React, { useContext } from 'react'
import { DateElement } from './DateElement'
import { DatesAndHoursContext } from '../context/DatesAndHoursContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { LoadingMessage } from './LoadingMessage';
import { ProfessionalsAndServicesContext } from '../context/ProfessionalsAndServicesContext';

export const CalendarSelector = () => {

  const { professional} = useContext( ProfessionalsAndServicesContext );

  const { dates, onSelectDate, calendarLoading } = useContext(DatesAndHoursContext);

  return (
    <>

      <div className='row' style={{ justifyContent: 'center' }}>
        <div className="col-10 offset-sm-1  col-md-8 mt-5">
          <h3>Elegir fecha y horario</h3>
        </div>
      </div>
      {
       professional.id == null ? // si no se selecciona ninguna fecha se muestra el mensaje de no hay fecha seleccionada
        <div className='row' style={{ justifyContent: 'center' }}>
          <div className='col-10 offset-sm-1 col-md-8 mt-5' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> 
            <div className="alert alert-warning">
              ⚠️ <strong>No hay profesional seleccionado</strong>.
            </div>
          </div>
        </div>
        :
        calendarLoading ? <LoadingMessage /> :
      <div className='row' style={{ justifyContent: 'center' }}>
        <div className="col-10 offset-sm-1  col-md-8">

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div>
                <FontAwesomeIcon className="faChevron icon" icon={faAngleDoubleLeft} size="2x" color="black" style={{ cursor: 'pointer' }} />
              </div>
              <div>
                <FontAwesomeIcon className="faChevron icon" icon={faChevronLeft} size="2x" color="black" style={{ cursor: 'pointer' }} />
              </div>

            </div>
            {
              dates.map((date, index) => {
                return (
                  <DateElement dateKey={index} date={date} onSelectDate={onSelectDate} />
                )
              })
            }
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div>
                <FontAwesomeIcon className="faChevron icon" icon={faAngleDoubleRight} size="2x" color="black" style={{ cursor: 'pointer' }} />
              </div>
              <div>
                <FontAwesomeIcon className="faChevron icon" icon={faChevronRight} size="2x" color="black" style={{ cursor: 'pointer' }} />
              </div>

            </div>
          </div>

        </div>
      </div>
      }


    </>
  )
}
