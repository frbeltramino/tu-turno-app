import React, { useContext, useState } from 'react'
import '../styles/mainStyles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
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
      <div className='row' style={ {justifyContent:'center'}}>
        <div className='col-10 offset-sm-1 col-md-8 mt-5' style={ {display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <h3>Profesional elegido</h3>
          
          <div 
            className='row'
            onClick={() =>  setModalOpen(true)}  
            style={ {justifyContent:'center', cursor:'pointer'}}
          >
            <FontAwesomeIcon icon={faEdit} size="1x" color="black" />
          </div>
          
        </div>
      </div>
      <div className='row' style={ {justifyContent:'center'}}  onClick={() => setModalOpen(true)}  >
        <div className="card col-10 offset-sm-1 col-md-8"  style={{ cursor: 'pointer' }}>
          <div className='row'>
            <div className="name col-sm-12 col-md-12" style={ { display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <div className="name col-sm-8 col-md-8" style={ { display:'flex', flexDirection:'row', justifyContent:'left', alignItems:'center'}}>
                <FontAwesomeIcon icon={faUser} size="2x" color="black"/>
                {
                   selectedService.id == null ? 
                   <p style={ { marginLeft:'10px', marginTop:'5px' }}>{ "-" }</p>
                   :
                   professional.id == null ?
                   <p style={ { marginLeft:'10px', marginTop:'5px' }}>{ "Seleccione un profesional" }</p>
                   :
                   <p style={ { marginLeft:'10px', marginTop:'5px' }}>{ professional.name }</p>
                }
              </div>
              <div className="col-sm-4 col-md-4 col-xl-2">
                <small style={{ color:'#6c757d', fontSize:'12px', marginTop:'10px' }}>Precio a definir</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
              <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {
                  selectedService.id == null ?
                  <h3 className="text-xl font-bold">No hay seleccionado ningún servicio</h3>
                  :
                  <div>
                  <h3 className="text-xl font-bold">Elegí el profesional</h3>
                  {
                    professionals.map((professional, index) => {
                      return (
                        <ProfessionalCardComponent professional={professional} onSelectionProfessional={handleSelectionProfessional}/>
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
