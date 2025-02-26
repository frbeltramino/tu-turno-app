import React from 'react'
import { Header } from './header'
import { Service } from './Service'
import { Professional } from './Professional'
import { CalendarSelector } from './CalendarSelector'
import { HoursComponent } from './HoursComponent'
import { ProfessionalsAndServicesProvider } from '../context/ProfessionalsAndServicesProvider'
import { DatesAndHoursProvider } from '../context/DatesAndHoursProvider'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonConfirm } from './ButtonConfirm'


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

          <ButtonConfirm/>
        </DatesAndHoursProvider>
      </ProfessionalsAndServicesProvider>


    </div>
  )
}
