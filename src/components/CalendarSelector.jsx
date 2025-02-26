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

  const [modalOpen, setModalOpen] = useState(false);

  const { dates, onSelectDate, calendarLoading } = useContext(DatesAndHoursContext);

  const currentDates = dates.slice(
        currentPage * datesPerPage,
        (currentPage + 1) * datesPerPage
      );

  const onShowModal = () => {
    setModalOpen(!modalOpen);
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
              <div
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
              >
                <FontAwesomeIcon className="faChevron icon" icon={faAngleDoubleLeft} size="2x" color="black" style={{ cursor: 'pointer' }} />
              </div>

            </div>
            {

              currentDates.map((date, index) => {
                return (
                  <DateElement dateKey={index} date={date} onSelectDate={onSelectDate} onShowModal={onShowModal} />
                )
              })
            }
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div
               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.floor(totalDates / datesPerPage) - 1))}
               disabled={currentPage >= Math.floor(totalDates / datesPerPage) - 1}
              >
                <FontAwesomeIcon className="faChevron icon" icon={faAngleDoubleRight} size="2x" color="black" style={{ cursor: 'pointer' }} />
              </div>
              
            </div>
          </div>

        </div>
      </div>
      }

      <div className="flex flex-col items-center justify-center h-screen">
        <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {
            <div>
              <div className="modal-header">⚠️</div>
              <p className='modal-body'>La fecha que quiere seleccionar no se encuentra disponible para éste profesional. Por favor, seleccione otra fecha.</p>
            </div>
          }
        </ModalCommon>
      </div>


    </>
  )
}
