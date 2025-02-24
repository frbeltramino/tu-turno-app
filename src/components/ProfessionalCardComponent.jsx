import { faChevronCircleLeft, faChevronCircleRight, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const ProfessionalCardComponent = ({ professional, onSelectionProfessional }) => {
  return (
    <div className="card col-12 col-md-12 mt-4" onClick={() => onSelectionProfessional(professional)} style={{ cursor: 'pointer' }}>
      <div className='row'>
        <div className="name col-sm-12 col-md-12" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="name col-sm-8 col-md-8" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faUser} size="2x" color="black"/>
            <p style={{ marginLeft: '10px', marginTop: '5px' }}>{professional.name}</p>
          </div>
          <div
            onClick={() => onSelectionProfessional(professional)}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faChevronCircleRight} size="1x" color="black" />
          </div>
        </div>
      </div>
    </div>
  )
}
