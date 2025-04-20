import React, { useContext } from 'react';
import { formatDate } from '../utils/commonUtilities.js';
import { AuthContext } from '../context/AuthContext';
import { useAppointment } from '../hooks/useAppointment.js';

export const AppointmentList = ({ appointments, onCancel, onCreate, loading }) => {
  

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="m-0">📅 Mis Turnos</h5>
        <button className="btn btn-new-appointment btn-sm"onClick={onCreate}>
          <i className="bi bi-plus"></i>&nbsp;<span>Nuevo Turno</span>
        </button>
      </div>

      {/* Loader cuando está cargando */}
      {loading ? (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="fs-6 mt-3">Cargando turnos...</p>
        </div>
      ) : (
        <div className="row">
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => { 
              
              const isCancelled = appointment.is_cancelled;
              const isCompleted = appointment.is_completed;
              const cardClass = isCancelled

              ? 'card bg-cancelled mb-2 shadow-sm'
              : isCompleted
              ? 'card bg-completed mb-2 shadow-sm'
              : 'card mb-2 shadow-sm';

              return(
              <div key={index} className="col-md-6 col-lg-4">
                <div className={ cardClass }>
                  <div className="card-body py-1 d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title mb-1 fs-6">{appointment.service_name}</h6>
                      <p className="mb-1 small"><strong>👨‍⚕️ Profesional:</strong> {appointment.professional_name}</p>
                      <p className="mb-1 small"><strong>📆 Fecha:</strong> {appointment.day} {formatDate(appointment.date)}</p>
                      <p className="mb-1 small"><strong>⏰ Hora:</strong> {appointment.start_hour} hs.</p>
                    </div>

                    {!(appointment.is_cancelled || appointment.is_completed) && (
                    <button 
                      className="btn btn-danger btn-sm ms-2" 
                      onClick={() => onCancel(appointment)}
                      title="Cancelar turno"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                  </div>
                </div>
              </div>
            )})
          ) : (
            <p className="text-center fs-6">No hay turnos agendados.</p>
          )}
        </div>
      )}
    </div>
  );
};
