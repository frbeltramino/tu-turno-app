import React from 'react'

export const HourElement = ({ hour, hourKey, onSelectHour }) => {
  const className = hour.isActive ? 'btn btn-primary' : hour.isDisabled ? 'btn btn-secondary' : 'btn btn-success';
  return (
    <div>
      <div className="name col-sm-12 col-md-12" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right', alignItems: 'center' }}>
        <div className="name col-sm-8 col-md-8" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
          <button 
            className = {className}
            style={ {  marginLeft: '10px', marginTop: '5px'} }
            onClick={() => {
              if (hour.isDisabled) {
                window.alert("No puedes seleccionar éste horario");
                return;
              }
              onSelectHour(hour)
             }} 
            key={hourKey}>
            {hour.hour}
          </button>
        </div>
      </div>
    </div>
  )
}
