import React, { useContext, useState } from 'react'
import { HourElement } from './HourElement';
import { useDateAndHours } from '../hooks/useDateAndHours';
import { DatesAndHoursContext } from '../context/DatesAndHoursContext';
import { LoadingMessage } from './LoadingMessage';
import { ModalCommon } from './ModalCommon';
import { useTranslation } from "react-i18next";


export const HoursComponent = () => {


const { hours, hoursAM, hoursPM, onSelectHour, hoursLoading } = useContext(DatesAndHoursContext);
const { t } = useTranslation();


  return (
    <>
      <div className="row justify-content-center col-12 col-md-12">
        <div className="col-10 col-md-8 mt-5 offset-sm-1 d-flex justify-content-between align-items-center">
          {hoursAM.length === 0 && hoursPM.length === 0 ? <div></div> : <h3>{  t("i18n.appointments.045") }</h3> }
        </div>
      </div>

      {hoursAM.length === 0 && hoursPM.length === 0 ? (
        // 🟡 Mensaje de advertencia si no hay fecha seleccionada
        <div className="row justify-content-center col-12 col-md-12">
          {/* <div className="col-10 col-md-8 mt-5 offset-sm-1">
            <div className="alert alert-warning text-center">
              ⚠️ <strong>{ t("i18n.appointments.046") }</strong>.
            </div>
          </div> */}
        </div>
      ) : hoursLoading ? (
        // ⏳ Cargando horas
        <LoadingMessage />
      ) : (
        // 📅 Distribución en 3 columnas
        <div className="row justify-content-center col-12 col-md-10 offset-md-1">
          <div className="col-4 d-flex flex-column align-items-center">
            {hoursAM.slice(0, Math.ceil(hoursAM.length / 2)).map((hour, index) => (
              <HourElement key={index} hour={hour} onSelectHour={onSelectHour} />
            ))}
          </div>
          <div className="col-4 d-flex flex-column align-items-center">
            {hoursAM.slice(Math.ceil(hoursAM.length / 2)).map((hour, index) => (
              <HourElement key={index} hour={hour} onSelectHour={onSelectHour} />
            ))}
            {hoursPM.slice(0, Math.ceil(hoursPM.length / 2)).map((hour, index) => (
              <HourElement key={index + hoursAM.length} hour={hour} onSelectHour={onSelectHour} />
            ))}
          </div>
          <div className="col-4 d-flex flex-column align-items-center">
            {hoursPM.slice(Math.ceil(hoursPM.length / 2)).map((hour, index) => (
              <HourElement key={index + hoursAM.length + hoursPM.length} hour={hour} onSelectHour={onSelectHour} />
            ))}
          </div>
        </div>
      )}

    
    </>
  )
}
