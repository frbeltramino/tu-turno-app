import React, { useContext, useState } from 'react'
import '../styles/mainStyles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faEdit } from "@fortawesome/free-solid-svg-icons";
import { ServiceCardComponent } from './ServiceCardComponent';
import { ProfessionalsAndServicesContext } from '../context/ProfessionalsAndServicesContext';
import { DatesAndHoursContext } from '../context/DatesAndHoursContext';
import { ModalCommon } from './ModalCommon';

export const Service = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const { services, selectedService, slectOneService, error } = useContext(ProfessionalsAndServicesContext);

  const { resetWorkingHours } = useContext(DatesAndHoursContext);

 
  const handleSelectionService = (serviceParam) => {
    slectOneService(serviceParam);
    setModalOpen(false);
    resetWorkingHours();
  };

  return (
    <>
      <div className='row col-12 col-md-12' style={{ justifyContent: 'center' }}>
        <div className='col-10 offset-sm-1  col-md-8 mt-3' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Servicio elegido</h3>
          <div
            onClick={() => setModalOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faEdit} size="1x" color="black" />
          </div>

        </div>
      </div>
      <div
        className='row col-12 col-md-12'
        onClick={() => setModalOpen(true)}
        style={{ justifyContent: 'center' }}
      >
        <div
          className="card col-10 offset-sm-1 col-md-8 d-flex justify-content-start align-items-center p-3"
          style={{ cursor: 'pointer' }}
        >
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faDog} size="2x" className="text-black" />
              <p className="mb-0 ms-2">
                {selectedService.name ? selectedService.name : 'Elegí un servicio'}
              </p>
            </div>
            {selectedService.time_turns && (
              <small className="text-secondary" style={{ fontSize: '12px' }}>
                {selectedService.time_turns} min
              </small>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {
            error ?
              <div>
                <div className="modal-header">❌</div>
                <p className='modal-body'>No se pudieron cargar los servicios.</p>
              </div>
              :
              services.map((service, index) => {
                return (
                  <ServiceCardComponent service={service} onSelectionService={handleSelectionService} />
                )
              })


          }

        </ModalCommon>
      </div>

    </>
  )
}
