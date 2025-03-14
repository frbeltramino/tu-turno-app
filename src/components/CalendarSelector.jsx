import React, { useContext, useEffect, useState } from 'react'
import { DateElement } from './DateElement'
import { DatesAndHoursContext } from '../context/DatesAndHoursContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { LoadingMessage } from './LoadingMessage';
import { ProfessionalsAndServicesContext } from '../context/ProfessionalsAndServicesContext';
import { ModalCommon } from './ModalCommon';

export const CalendarSelector = () => {

  const { professional} = useContext( ProfessionalsAndServicesContext );

  const { dates, onSelectDate, calendarLoading } = useContext(DatesAndHoursContext);

    

  const handleOnSelectDate = (date) => {
    onSelectDate(date, professional);
   
  }

  const [currentPage, setCurrentPage] = useState(0);
  const [datesPerPage, setDatesPerPage] = useState(5); // Cantidad de fechas visibles

  useEffect(() => {
    // Ajusta la cantidad de fechas por página según el tamaño de la pantalla
    const updateDatesPerPage = () => {
      if (window.innerWidth < 576) {
        setDatesPerPage(3); // Solo 3 fechas en móviles
      } else if (window.innerWidth < 768) {
        setDatesPerPage(5); // 5 fechas en tablets
      } else {
        setDatesPerPage(7); // 7 fechas en pantallas grandes
      }
    };

    updateDatesPerPage();
    window.addEventListener("resize", updateDatesPerPage);
    return () => window.removeEventListener("resize", updateDatesPerPage);
  }, []);

  // Calculamos las fechas visibles según la página actual
  const startIndex = currentPage * datesPerPage;
  const currentDates = dates.slice(startIndex, startIndex + datesPerPage);
  const totalPages = Math.ceil(dates.length / datesPerPage);

  return (
    <>

      <div className='row col-12 col-md-12' style={{ justifyContent: 'center' }}>
        <div className="col-10 col-md-8 offset-sm-1 mt-5">
          <h3>Elegir fecha y horario</h3>
        </div>
      </div>
      {
       professional.id == null ? // si no se selecciona ninguna fecha se muestra el mensaje de no hay fecha seleccionada
        <div className='row col-12 col-md-12' style={{ justifyContent: 'center' }}>
          <div className='col-10 col-md-8 mt-5 offset-sm-1' > 
            <div className="alert alert-warning text-center">
              ⚠️ <strong>No hay profesional seleccionado</strong>.
            </div>
          </div>
        </div>
        :
        calendarLoading ? <LoadingMessage /> :
        <div className="row col-12 col-sm-12 col-md-12 justify-content-center">
        <div className="col-10 col-sm-10 col-md-8 offset-md-1 text-center">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <button
                 className={`btn rounded-pill custom-tall-btn ${
                  currentPage === 0 ? "btn-secondary" : "btn-dark"
                }`}
                onClick={() =>  setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
                style={ {marginRight:"10px"} }
              >
                <FontAwesomeIcon className="faChevron icon" icon={faAngleDoubleLeft} size="1x" color="white" style={{ cursor: 'pointer' }} />
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
                className={`btn rounded-pill custom-tall-btn ${
                  currentPage >= totalPages - 1 ? "btn-secondary" : "btn-dark"
                }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage >= totalPages - 1}
              >
                <FontAwesomeIcon className="faChevron icon" icon={faAngleDoubleRight} size="1x" color="white" style={{ cursor: 'pointer' }} />
              </button>
              
            </div>
          </div>

        </div>
      </div>
      }


    </>
  )
}
