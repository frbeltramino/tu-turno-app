import { faChevronCircleLeft, faChevronCircleRight, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const ProfessionalCardComponent = ({ professional, onSelectionProfessional }) => {
  return (
    <div 
    className="card col-12 col-md-12 mt-4 d-flex justify-content-center align-items-center text-center p-3" 
    onClick={() => onSelectionProfessional(professional)} 
    style={{ cursor: 'pointer' }}
  >
    <div className="d-flex justify-content-between align-items-center w-100">
      
      {/* Ícono y Nombre */}
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faUser} size="2x" className="text-black" />
        <p className="mb-0 ms-2">{professional.name}</p>
      </div>
  
      {/* Flecha de Selección */}
      <div onClick={() => onSelectionProfessional(professional)} style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faChevronCircleRight} size="1x" className="text-black" />
      </div>
  
    </div>
  </div>
  )
}
