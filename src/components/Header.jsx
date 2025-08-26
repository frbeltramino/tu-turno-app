import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ModalCommon } from './ModalCommon';
import { useAuth } from '../hooks/useAuth';
import { AppointmentsContext } from '../context/AppointmentsContext';
import { useTranslation } from "react-i18next";
import LanguageSelector from './LanguageSelector';

export const Header = () => {

  const { authStatus, handleShowUserSettings } = useContext(AuthContext);
  const { startLogout, showLogin } = useAuth();
  const { handleCreateNewAppointment } = useContext(AppointmentsContext);

  const isLoggedIn = authStatus === "authenticated";
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useTranslation();

  const handleLogout = () => {
    startLogout();
    setModalOpen(false);
    setDropdownOpen(false);
  };

  const handleCreateAppointment = () => {
    handleCreateNewAppointment(true);
    handleShowUserSettings(false);
    setDropdownOpen(false);
  };

  const handleGoToProfile = () => {
    handleCreateNewAppointment(false);
    handleShowUserSettings(false);
    setDropdownOpen(false);
  };

  const onClickBtnSettings = () => {
    handleCreateNewAppointment(false);
    handleShowUserSettings(true);
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark mb-3 px-3 py-2">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        {/* Logo y título */}
        <div className="d-flex align-items-center gap-2">
          <img
            src="/calendar3D.png"
            alt="calendar"
            style={{ width: '40px', height: '40px' }}
          />
          <span className="navbar-brand text-light fw-bold fs-6 m-0 text-break text-wrap">
            {t("i18n.appointments.038")}
          </span>
        </div>

        {/* Selector de idioma y menú de usuario */}
        <div className="d-flex align-items-center gap-2">
          <LanguageSelector />

          {isLoggedIn ? (
            <div className="dropdown">
              <button
                className="btn btn-sm btn-outline-light dropdown-toggle d-flex align-items-center gap-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <i className="fas fa-user-circle fs-5"></i>
              </button>

              {dropdownOpen && (
                <ul
                  className="dropdown-menu dropdown-menu-end show position-absolute mt-2"
                  style={{ right: 0 }}
                >
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={handleGoToProfile}
                    >
                      <i className="fas fa-user-circle me-2"></i>
                      {t("i18n.appointments.039")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={handleCreateAppointment}
                    >
                      <i className="fas fa-plus-circle me-2"></i>
                      {t("i18n.appointments.016")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={onClickBtnSettings}
                    >
                      <i className="fas fa-cog me-2"></i>
                      {t("i18n.appointments.040")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2 text-danger"
                      onClick={() => setModalOpen(true)}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      {t("i18n.appointments.041")}
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button
              className="btn btn-sm btn-outline-success"
              onClick={showLogin}
            >
              <i className="fas fa-sign-in-alt"></i>&nbsp;
              <span className="d-none d-sm-inline">{t("i18n.appointments.042")}</span>
            </button>
          )}
        </div>

      </div>
    </nav>

      {/* Modal de confirmación de logout */}
      <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="text-center">
          <div className="mb-3">
            <i className="bi bi-exclamation-triangle-fill text-warning fs-1"></i>
          </div>
          <h5 className="fw-bold">{  t("i18n.common.002") }</h5>
        </div>
        <div className="modal-footer d-flex justify-content-center gap-3 mt-4">
          <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setModalOpen(false)}>
            { t("i18n.common.004") }
          </button>
          <button type="button" className="btn btn-danger px-4" onClick={handleLogout}>
            { t("i18n.common.003") }
          </button>
        </div>
      </ModalCommon>
    </>
  );
};