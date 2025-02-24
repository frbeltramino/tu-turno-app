import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const ServiceCardComponent = ({ service, onSelectionService }) => {
  return (
    <div className="card col-12 col-md-12 mt-4" onClick={() => onSelectionService(service)} style={{ cursor: 'pointer' }}>
      <div className='row'>
        <div className="name col-sm-12 col-md-12" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="name col-sm-8 col-md-8" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
            <img className="profile-img" src={service.image} alt="profile-img"></img>
            <p style={{ marginLeft: '10px', marginTop: '5px' }}>{service.name}</p>
          </div>
          <div
            onClick={() => onSelectionService(service)}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faChevronCircleRight} size="1x" color="black" />
          </div>
        </div>
      </div>
    </div>
  )
}
