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
      <div className='row' style={{ justifyContent: 'center' }}>
        <div className='col-10 offset-sm-1  col-md-8 mt-5' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
        className='row'
        onClick={() => setModalOpen(true)}
        style={{ justifyContent: 'center' }}
      >
        <div className="card col-10 offset-sm-1  col-md-8" style={{ cursor: 'pointer' }}>
          <div className='row'>
            <div className="name col-sm-12 col-md-12" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="name col-sm-8 col-md-8" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                {
                  selectedService.image ? <img className="profile-img" src={selectedService.image} alt="profile-img"></img> : <FontAwesomeIcon icon={faDog} size="2x" color="black" />
                }
                <p style={{ marginLeft: '10px', marginTop: '5px' }}>{selectedService.name ? selectedService.name : 'Elegí un servicio'}</p>
              </div>
            </div>
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
