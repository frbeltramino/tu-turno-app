import React from 'react'
import { Header } from '../../components/Header'
import { Service } from '../../components/Service'
import { Professional } from '../../components/Professional'
import { CalendarSelector } from '../../components/CalendarSelector'
import { HoursComponent } from '../../components/HoursComponent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonConfirm } from '../../components/ButtonConfirm'
import { ProfessionalsAndServicesProvider } from '../../context/ProfessionalsAndServicesProvider'
import { DatesAndHoursProvider } from '../../context/DatesAndHoursProvider'
import { AppRouter } from '../../router/AppRouter'
import { LoaderScreen } from '../../components/LoaderScreen'



export const App = () => {

  return (
    <div>

        <ProfessionalsAndServicesProvider>
          <DatesAndHoursProvider>
            
           
            <Header />
            <Service />
            <Professional />
            <CalendarSelector />

            <HoursComponent />

            <ButtonConfirm />
            <LoaderScreen/>
  
          </DatesAndHoursProvider>
        </ProfessionalsAndServicesProvider>

    </div>
  )
}
