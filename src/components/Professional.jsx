import React, { useContext, useEffect, useState } from 'react'
import '../styles/mainStyles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faEdit, faUser, faWarning } from "@fortawesome/free-solid-svg-icons";
import { ProfessionalCardComponent } from './ProfessionalCardComponent';
import { ProfessionalsAndServicesContext } from '../context/ProfessionalsAndServicesContext';
import { DatesAndHoursContext } from '../context/DatesAndHoursContext';
import { ModalCommon } from './ModalCommon';

export const Professional = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const { selectedService, professional, setProfessional, professionals } = useContext(ProfessionalsAndServicesContext);

  const { setProfessionalWorkingDays, resetSelectedDay, getTurnsNotAvailable } = useContext(DatesAndHoursContext);

  const slectOneProfessional = (professionalParam) => {
    if (professionalParam.id !== professional.id) {
      resetSelectedDay();;
      setProfessional(professionalParam);
      setProfessionalWorkingDays(professionalParam, selectedService.time_turns);
      getTurnsNotAvailable(professionalParam);

    }
  }

  const handleSelectionProfessional = (professionalParam) => {
    slectOneProfessional(professionalParam);
    setModalOpen(false);
  };


  return (

    <>
      <div className='row col-12 col-md-12' style={{ justifyContent: 'center' }}>
        <div className='col-10 offset-sm-1 col-md-8 mt-5' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Profesional elegido</h3>

          <div
            className='row'
            onClick={() => setModalOpen(true)}
            style={{ justifyContent: 'center', cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faEdit} size="1x" color="black" />
          </div>

        </div>
      </div>
      <div className='row col-12 col-md-12' style={{ justifyContent: 'center' }} onClick={() => setModalOpen(true)}  >
        <div
          className="card col-10 offset-sm-1 col-md-8 d-flex flex-column justify-content-center align-items-start p-3"
          style={{ cursor: 'pointer' }}
        >
          <div className="d-flex justify-content-between align-items-center w-100">

            {/* Ícono y Texto */}
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUser} size="2x" className="text-black" />
              <p className="mb-0 ms-2">
                {selectedService.id == null
                  ? "-"
                  : professional.id == null
                    ? "Seleccione un profesional"
                    : professional.name}
              </p>
            </div>

            {/* Precio */}
            <div>
              <small className="text-secondary" style={{ fontSize: '12px' }}>
                Precio a definir
              </small>
            </div>

          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {
            selectedService.id == null ?
              <div className="d-flex flex-column align-items-center justify-content-center">
                <FontAwesomeIcon icon={faWarning} size="2x" color="#fcdb03" />
                <h3 className="text-xl font-bold"> No hay seleccionado ningún servicio</h3>
              </div>
              :
              <div>
                <h3 className="text-xl font-bold">Elegí el profesional</h3>
                {
                  professionals.map((professional, index) => {
                    return (
                      <ProfessionalCardComponent professional={professional} onSelectionProfessional={handleSelectionProfessional} />
                    )
                  })
                }
              </div>
          }
        </ModalCommon>
      </div>

    </>
  )
}
