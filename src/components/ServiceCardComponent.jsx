import { faChevronCircleLeft, faChevronCircleRight, faDog } from '@fortawesome/free-solid-svg-icons'
import { faConciergeBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { useTranslation } from "react-i18next";
import React from 'react'

export const ServiceCardComponent = ({ service, onSelectionService }) => {
  const { t } = useTranslation();
  return (
    <div 
  className="card col-12 col-md-12 mt-4 d-flex justify-content-center align-items-center text-center p-3" 
  onClick={() => onSelectionService(service)} 
  style={{ cursor: 'pointer' }}
>
  <div className="d-flex justify-content-between align-items-center w-100">
    {/* Nombre e Ícono */}
    <div className="d-flex align-items-center">
      <RoomServiceIcon style={{ fontSize: 40, color: "black" }} />
      <p className="mb-0 ms-2">{service.name}</p>
    </div>
    <div className="d-flex flex-column align-items-center gap-1">
      <div className="w-100 text-end">
        <small className="text-muted">
          {service.time_turns} min
        </small>
      </div>
      
        <div>
          <small className="text-muted" style={{ fontSize: '12px' }}>
            {service.is_virtual ? t("i18n.services.005") : t("i18n.services.006")}
          </small>
        </div>
     
    </div>

    {/* Flecha de Selección */}
    <div onClick={() => onSelectionService(service)} style={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faChevronCircleRight} size="1x" className="text-black" />
    </div>
  </div>
</div>
  )
}
