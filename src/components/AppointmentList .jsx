import React, { useContext } from 'react';
import { formatDate } from '../utils/commonUtilities.js';
import { AuthContext } from '../context/AuthContext';
import { useAppointment } from '../hooks/useAppointment.js';
import { useTranslation } from "react-i18next";

export const AppointmentList = ({ appointments, onCancel, onCreate, loading }) => {
  
  const { t } = useTranslation();

  return (
   <div className="container mt-3">
  <div className="mx-auto" style={{ maxWidth: '800px' }}>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="m-0">{t("i18n.appointments.007")}</h5>
      <button className="btn btn-new-appointment btn-sm" onClick={onCreate}>
        <i className="bi bi-plus"></i>&nbsp;<span>{t("i18n.appointments.008")}</span>
      </button>
      
    </div>
     <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
        {t("i18n.appointments.010")}
      </p>
    {loading ? (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">{t("i18n.common.001")}</span>
        </div>
        <p className="fs-6 mt-3">{t("i18n.common.001")}</p>
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
                      <p className="mb-1 small"><strong>{t("i18n.appointments.011")}</strong> {appointment.professional_name}</p>
                      <p className="mb-1 small"><strong>{t("i18n.appointments.012")}</strong> {formatDate(appointment.date)}</p>
                      <p className="mb-1 small"><strong>{t("i18n.appointments.013")}</strong> {appointment.start_hour} hs.</p>
                      <p className="mb-1 small"><strong>{modalidadIcon} {t("i18n.appointments.017")}</strong> {appointment.is_virtual ? t("i18n.appointments.018") : t("i18n.appointments.019")}</p>
                      {
                        appointment.address && <p className="mb-1 small"><strong>{t("i18n.appointments.020")}</strong> {appointment.address} hs.</p>
                      }
                      {
                        appointment.meetLink && <p className="mb-1 small"><strong>{t("i18n.appointments.021")}</strong> {appointment.meetLink} hs.</p>
                      }
                      {isConfirmed && !isCancelled && !isCompleted ? (
                        <p className="mb-1 small text-success"><strong>{ t("i18n.appointments.025") }</strong></p>
                      ) : isCancelled ? (
                        <p className="mb-1 small text-danger"><strong>{ t("i18n.appointments.022") }</strong></p>
                      ) : isCompleted ? (
                        <p className="mb-1 small text-secondary"><strong>{ t("i18n.appointments.023") }</strong></p>
                      ) : (
                        <p className="mb-1 small text-warning"><strong>{ t("i18n.appointments.024") }</strong></p>
                      )}
                    </div>

                    {!(appointment.is_cancelled || appointment.is_completed) && (
                      <div className="mt-2 mt-sm-0">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onCancel(appointment)}
                          title={t("i18n.appointments.015")}
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
          <p className="text-center fs-6">{ t("i18n.appointments.009") }</p>
        )}
      </div>
    )}
  </div>
</div>
  );
};
