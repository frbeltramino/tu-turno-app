import React, { useContext } from 'react';
import { formatDate } from '../utils/commonUtilities.js';
import { AuthContext } from '../context/AuthContext';
import { useAppointment } from '../hooks/useAppointment.js';

export const AppointmentList = ({ appointments, onCancel, onCreate, loading }) => {
  

  return (
   <div className="container mt-3">
  <div className="mx-auto" style={{ maxWidth: '800px' }}>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="m-0">📅 Mis Turnos</h5>
      <button className="btn btn-new-appointment btn-sm" onClick={onCreate}>
        <i className="bi bi-plus"></i>&nbsp;<span>Nuevo Turno</span>
      </button>
      
    </div>
     <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
        Mostrando los últimos 10 turnos agendados
      </p>
    {loading ? (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="fs-6 mt-3">Cargando turnos...</p>
      </div>
    ) : (
      <div>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => {
            const isConfirmed = appointment.is_confirmed;
            const isCancelled = appointment.is_cancelled;
            const isCompleted = appointment.is_completed;

            const cardClass = isCancelled
              ? 'card bg-cancelled mb-3 shadow-sm'
              : isCompleted
              ? 'card bg-completed mb-3 shadow-sm'
              : 'card mb-3 shadow-sm';
            const modalidadIcon = appointment.is_virtual ? "💻" : "📅";
            return (
              <div key={index} className="col-12">
                <div className={cardClass}>
                  <div className="card-body p-3 d-flex justify-content-between align-items-start flex-column flex-sm-row">
                    <div className="w-100 pe-sm-3">
                      <h6 className="card-title mb-2 fs-6">{appointment.service_name}</h6>
                      <p className="mb-1 small"><strong>👨‍⚕️ Profesional:</strong> {appointment.professional_name}</p>
                      <p className="mb-1 small"><strong>📆 Fecha:</strong> {appointment.day} {formatDate(appointment.date)}</p>
                      <p className="mb-1 small"><strong>⏰ Hora:</strong> {appointment.start_hour} hs.</p>
                      <p className="mb-1 small"><strong>{modalidadIcon} Modalidad:</strong> {appointment.is_virtual ? "Virtual" : "Presencial"}</p>
                      {
                        appointment.address && <p className="mb-1 small"><strong>📍 Dirección:</strong> {appointment.address} hs.</p>
                      }
                      {
                        appointment.meetLink && <p className="mb-1 small"><strong>💻 Link de meet:</strong> {appointment.meetLink} hs.</p>
                      }
                      {isConfirmed && !isCancelled && !isCompleted ? (
                        <p className="mb-1 small text-success"><strong>Turno confirmado</strong></p>
                      ) : isCancelled ? (
                        <p className="mb-1 small text-danger"><strong>Turno cancelado</strong></p>
                      ) : isCompleted ? (
                        <p className="mb-1 small text-secondary"><strong>Turno completado</strong></p>
                      ) : (
                        <p className="mb-1 small text-warning"><strong>Turno pendiente</strong></p>
                      )}
                    </div>

                    {!(appointment.is_cancelled || appointment.is_completed) && (
                      <div className="mt-2 mt-sm-0">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onCancel(appointment)}
                          title="Cancelar turno"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center fs-6">No hay turnos agendados.</p>
        )}
      </div>
    )}
  </div>
</div>
  );
};
