import React, { useState } from 'react'
import '../styles/mainStyles.css'

import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.min.css";
import { useTranslation } from "react-i18next";
import { getI18nMonth, getI18nDay } from '../utils/commonUtilities.js';

export const DateElement = ({ keyDate, date, onSelectDate }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='dateElementContainer' key={keyDate}>
        <p className='dateButtonFont' style={{ marginTop: '10px', textAlign: 'justify' }} >{ getI18nMonth(date.date) }</p>

        {
          <div className='dateButton'
            style={{ backgroundColor: date.isActive ? '#5d5def' : date.isDisabled ? '#f0f0f0' : '#c7ffe4' }}
            disabled={date.isDisabled}
            onClick={(event) => {
              if (date.isDisabled) {
                Swal.fire( t("i18n.appointments.036") , t("i18n.appointments.037"), "error");
                return;
              }
              onSelectDate(date);
            }}>
            <div>
              <p className='dateButtonFont' style={{ marginTop: '10px' }}>{getI18nDay(date.date)}</p>
              <p className='dateButtonFont' style={{ textAlign: 'center', }}>{date.dayNumber}</p>
            </div>
          </div>
        }
      </div>

      
    </>


  )
}
