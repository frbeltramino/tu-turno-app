import { faChevronCircleLeft, faChevronCircleRight, faDog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const ServiceCardComponent = ({ service, onSelectionService }) => {
  return (
    <div 
  className="card col-12 col-md-12 mt-4 d-flex justify-content-center align-items-center text-center p-3" 
  onClick={() => onSelectionService(service)} 
  style={{ cursor: 'pointer' }}
>
  <div className="d-flex justify-content-between align-items-center w-100">
    {/* Nombre e Ícono */}
    <div className="d-flex align-items-center">
      <FontAwesomeIcon icon={faDog} size="2x" className="text-black" />
      <p className="mb-0 ms-2">{service.name}</p>
    </div>

    {/* Flecha de Selección */}
    <div onClick={() => onSelectionService(service)} style={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faChevronCircleRight} size="1x" className="text-black" />
    </div>
  </div>
</div>
  )
}
