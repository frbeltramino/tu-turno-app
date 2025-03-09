import React, { useContext, useEffect, useState } from 'react'
import { DateElement } from './DateElement'
import { DatesAndHoursContext } from '../context/DatesAndHoursContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { LoadingMessage } from './LoadingMessage';
import { ProfessionalsAndServicesContext } from '../context/ProfessionalsAndServicesContext';
import { ModalCommon } from './ModalCommon';

export const CalendarSelector = () => {

  const totalDates = 30;
  const datesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const { professional} = useContext( ProfessionalsAndServicesContext );

  const { dates, onSelectDate, calendarLoading } = useContext(DatesAndHoursContext);

  const currentDates = dates.slice(
        currentPage * datesPerPage,
        (currentPage + 1) * datesPerPage
      );


  const handleOnSelectDate = (date) => {
    onSelectDate(date, professional);
   
  }


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
             
              <button
              className={`btn rounded-pill px-2 py-1 ${currentPage === 0 ? "btn-secondary" : "btn-dark"}`}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                  disabled={currentPage === 0}
              >
                <FontAwesomeIcon className="faChevron icon" icon={faAngleDoubleLeft} size="2x" color="white" style={{ cursor: 'pointer' }} />
              </button>

            </div>
            {

              currentDates.map((date, index) => {
                return (
                  <DateElement dateKey={index} date={date} onSelectDate={handleOnSelectDate}/>
                )
              })
            }
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
              <button
              className={`btn rounded-pill px-2 py-1 ${currentPage >= Math.floor(totalDates / datesPerPage) - 1 ? "btn-secondary" : "btn-dark"}`}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.floor(totalDates / datesPerPage) - 1))}
                  disabled={currentPage >= Math.floor(totalDates / datesPerPage) - 1}
              >
                <FontAwesomeIcon className="faChevron icon" icon={faAngleDoubleRight} size="2x" color="white" style={{ cursor: 'pointer' }} />
              </button>
              
            </div>
          </div>

        </div>
      </div>
      }


    </>
  )
}
