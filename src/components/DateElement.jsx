import React, { useState } from 'react'
import '../styles/mainStyles.css'

import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.min.css";





export const DateElement = ({ keyDate, date, onSelectDate }) => {


  return (
    <>
      <div className='dateElementContainer' key={keyDate}>
        <p className='dateButtonFont' style={{ marginTop: '10px', textAlign: 'justify' }} >{date.month}</p>

        {
          <div className='dateButton'
            style={{ backgroundColor: date.isActive ? '#5d5def' : date.isDisabled ? '#f0f0f0' : '#c7ffe4' }}
            disabled={date.isDisabled}
            onClick={(event) => {
              if (date.isDisabled) {
                Swal.fire('Fecha no disponible', 'Por favor seleccione otra fecha', 'error');
                return;
              }
              onSelectDate(date);
            }}>
            <div>
              <p className='dateButtonFont' style={{ marginTop: '10px' }}>{date.day}</p>
              <p className='dateButtonFont' style={{ textAlign: 'center', }}>{date.dayNumber}</p>
            </div>
          </div>
        }
      </div>

      
    </>


  )
}
