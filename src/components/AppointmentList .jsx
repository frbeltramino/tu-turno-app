import React, { useContext } from 'react';
import { formatDate } from '../utils/commonUtilities.js';
import { AuthContext } from '../context/AuthContext';

export const AppointmentList = ({ appointments, onDelete, onCreate }) => {
  const { userAppointmentsLoading } = useContext(AuthContext);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="m-0">📅 Mis Turnos</h5>
        <button className="btn btn-success btn-sm" onClick={onCreate}>
          <i className="bi bi-plus"></i> Nuevo Turno
        </button>
      </div>

      {/* Loader cuando está cargando */}
      {userAppointmentsLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="fs-6">Cargando turnos...</p>
        </div>
      ) : (
        <div className="row">
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card mb-2 shadow-sm">
                  <div className="card-body py-1 d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title mb-1 fs-6">{appointment.service_name}</h6>
                      <p className="mb-1 small"><strong>👨‍⚕️ Profesional:</strong> {appointment.professional_name}</p>
                      <p className="mb-1 small"><strong>📆 Fecha:</strong> {appointment.day} {formatDate(appointment.date)}</p>
                      <p className="mb-1 small"><strong>⏰ Hora:</strong> {appointment.start_hour} hs.</p>
                    </div>

                    {/* Botón de eliminar */}
                    <button 
                      className="btn btn-danger btn-sm ms-2" 
                      onClick={() => onDelete(appointment.id)}
                      title="Eliminar turno"
                    >
                      <i className="bi bi-trash"></i> {/* Ícono de eliminar */}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center fs-6">No hay turnos agendados.</p>
          )}
        </div>
      )}
    </div>
  );
};