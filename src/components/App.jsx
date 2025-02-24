import React from 'react'
import { Header } from './header'
import { Service } from './Service'
import { Professional } from './Professional'
import { CalendarSelector } from './CalendarSelector'
import { HoursComponent } from './HoursComponent'
import { faCartShopping, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { ProfessionalsAndServicesProvider } from '../context/ProfessionalsAndServicesProvider'
import { DatesAndHoursProvider } from '../context/DatesAndHoursProvider'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOpencart } from "@fortawesome/free-brands-svg-icons";

export const App = () => {
  return (
    <div>
      <ProfessionalsAndServicesProvider>
      <DatesAndHoursProvider>

      <Header/>
      <Service/>
      <Professional/>
      <CalendarSelector/>
      <HoursComponent/>

      <div div className="col-12 col-md-12" style={ { display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'16px', marginBottom:'16px'}}>
        <button className='btn btn-primary' style={{width:"200px"}} onClick={() => { console.log("Turno pedido") }}> <FontAwesomeIcon icon={faShoppingCart} size="1x" color="white" /> Pedir Turno</button>
      </div>
      </DatesAndHoursProvider>
      </ProfessionalsAndServicesProvider>

       
    </div>
  )
}
